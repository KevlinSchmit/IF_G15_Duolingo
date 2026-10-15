"""Remove tracked eyebrows and fade confetti in the cropped sharing clip.

Requires numpy, opencv-python-headless and ffmpeg. Usage:
  python scripts/refine-sharing-video.py INPUT.mp4 OUTPUT.mp4 --poster POSTER.webp
The input is the original 720 x 1084 crop, available in commit 7bc2648.
"""
import argparse
from pathlib import Path
import subprocess

import cv2
import numpy as np


def face_landmarks(frame):
    blue, green, red = cv2.split(frame)
    dark = ((red < 112) & (green < 84) & (blue < 75)).astype(np.uint8) * 255
    dark[:80] = 0
    dark[500:] = 0
    dark[:, :270] = 0
    dark[:, 520:] = 0
    count, labels, stats, centers = cv2.connectedComponentsWithStats(dark)
    brows = [i for i in range(1, count)
             if 300 < stats[i, 4] < 520 and 27 <= stats[i, 2] <= 38
             and 10 <= stats[i, 3] <= 26
             and stats[i, 4] / (stats[i, 2] * stats[i, 3]) > .6]
    if not brows:
        raise ValueError('Unable to locate the left eyebrow')
    top = min(centers[i, 1] for i in brows)
    left = min((i for i in brows if centers[i, 1] < top + 25),
               key=lambda i: centers[i, 0])
    origin = centers[left]
    eyes = [i for i in range(1, count)
            if 170 < stats[i, 4] < 300 and 28 <= stats[i, 2] <= 39
            and 9 <= stats[i, 3] <= 27
            and .2 < stats[i, 4] / (stats[i, 2] * stats[i, 3]) < .6
            and origin[1] + 14 < centers[i, 1] < origin[1] + 60
            and origin[0] - 20 < centers[i, 0] < origin[0] + 82]
    eyes.sort(key=lambda i: centers[i, 0])
    offset = (centers[eyes[1]] - centers[eyes[0]]) * 1.025 if len(eyes) == 2 else None
    return origin, offset, labels == left, dark


def remove_brows(frame, landmarks, offset):
    origin, _, left_mask, dark = landmarks
    right = origin + offset
    axis = offset / np.linalg.norm(offset)
    normal = np.array([-axis[1], axis[0]])
    yy, xx = np.indices(frame.shape[:2])
    delta_x, delta_y = xx - right[0], yy - right[1]
    along = delta_x * axis[0] + delta_y * axis[1]
    across = delta_x * normal[0] + delta_y * normal[1]
    blue, green, red = [value.astype(np.int16) for value in cv2.split(frame)]
    skin_color = ((red > 180) & (green > 110) & (blue > 70)
                  & (red - green > 25) & (green - blue > 15))
    # Continue the forehead edge through the attached brow, rather than
    # painting a rectangular bite into the adjacent hair.
    edge_samples = []
    nearby = skin_color & (along > -35) & (along < 55)
    for row in [*range(-28, -12), *range(13, 30)]:
        edge = along[nearby & (np.abs(across - row) < .6)]
        if edge.size:
            edge_samples.append((row, np.max(edge)))
    if len(edge_samples) < 10:
        raise ValueError('Unable to continue the forehead edge')
    edge_samples = np.asarray(edge_samples)
    boundary = np.polyval(np.polyfit(edge_samples[:, 0], edge_samples[:, 1], 1), across)
    right_mask = (np.abs(along) < 19) & (np.abs(across) < 9.5) & (dark > 0)
    mask = cv2.dilate((left_mask | right_mask).astype(np.uint8) * 255,
                      cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    mask[along > boundary] = 0
    # Fit the flat skin shading from neighboring forehead pixels. This avoids
    # dragging dark hair into the right brow, which touches the hair boundary.
    skin = (skin_color
            & (xx > origin[0] - 25) & (xx < right[0] + 20)
            & (yy > min(origin[1], right[1]) - 16)
            & (yy < max(origin[1], right[1]) + 28) & (mask == 0))
    sy, sx = np.where(skin)
    if len(sx) < 40:
        raise ValueError('Insufficient forehead pixels for a clean repair')
    design = np.column_stack([np.ones(len(sx)), sx - origin[0], sy - origin[1]])
    colors = frame[sy, sx].astype(float)
    fit = np.linalg.lstsq(design, colors, rcond=None)[0]
    y, x = np.where(mask > 0)
    predicted = np.column_stack([np.ones(len(x)), x - origin[0], y - origin[1]]) @ fit
    predicted = np.clip(predicted, np.percentile(colors, 10, axis=0) - 3,
                        np.percentile(colors, 90, axis=0) + 3)
    repaired = frame.copy()
    repaired[y, x] = np.clip(predicted, 0, 255).astype(np.uint8)
    return repaired


def confetti_mask(frame):
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    green = cv2.inRange(hsv, (32, 90, 75), (85, 255, 255))
    gold = cv2.inRange(hsv, (14, 150, 150), (38, 255, 255))
    result = np.zeros(frame.shape[:2], np.uint8)
    pieces = 0
    for candidate, bounds, max_area in [(green, (125, 80, 700, 820), 1300),
                                        (gold, (500, 85, 630, 400), 2200)]:
        count, labels, stats, _ = cv2.connectedComponentsWithStats(candidate)
        left, top, right, bottom = bounds
        for i in range(1, count):
            x, y, width, height, area = stats[i]
            if (20 < area < max_area and width < 100 and height < 100
                    and x > left and y > top and x + width < right
                    and y + height < bottom):
                result[labels == i] = 255
                pieces += 1
    result = cv2.dilate(result, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    return result, pieces


def process(source, destination, poster):
    if source.resolve() == destination.resolve():
        raise ValueError('Use separate input and output paths')
    capture = cv2.VideoCapture(str(source))
    fps = capture.get(cv2.CAP_PROP_FPS)
    frames = []
    while True:
        success, frame = capture.read()
        if not success:
            break
        frames.append(frame)
    capture.release()
    if not frames or frames[0].shape[:2] != (1084, 720):
        raise ValueError('Expected the original cropped 720 x 1084 sharing video')
    landmarks = [face_landmarks(frame) for frame in frames]
    known = [i for i, record in enumerate(landmarks) if record[1] is not None]
    offsets = np.array([record[1] for record in landmarks if record[1] is not None])
    tracked = np.column_stack([np.interp(np.arange(len(frames)), known, offsets[:, axis])
                               for axis in range(2)])
    destination.parent.mkdir(parents=True, exist_ok=True)
    encoder = subprocess.Popen([
        'ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'rawvideo',
        '-pixel_format', 'bgr24', '-video_size', '720x1084', '-framerate', str(fps),
        '-i', '-', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(destination)], stdin=subprocess.PIPE)
    counts = []
    try:
        for index, (frame, record, offset) in enumerate(zip(frames, landmarks, tracked)):
            repaired = remove_brows(frame, record, offset)
            mask, pieces = confetti_mask(frame)
            counts.append(pieces)
            clean = cv2.inpaint(repaired, mask, 4, cv2.INPAINT_TELEA)
            progress = np.clip((index / fps - .25) / 2.55, 0, 1)
            opacity = 1 - progress * progress * (3 - 2 * progress)
            output = cv2.addWeighted(repaired, float(opacity), clean, float(1 - opacity), 0)
            encoder.stdin.write(output.tobytes())
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError('ffmpeg encoding failed')
    except BaseException:
        encoder.stdin.close()
        encoder.terminate()
        encoder.wait()
        raise
    if poster:
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                        '-i', str(destination), '-frames:v', '1', str(poster)], check=True)
    print(f'Processed {len(frames)} frames at {fps:g} fps; '
          f'{min(counts)}–{max(counts)} confetti pieces tracked per frame; '
          'fully faded by 2.8 seconds. H.264 output has no audio stream.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('destination', type=Path)
    parser.add_argument('--poster', type=Path)
    args = parser.parse_args()
    process(args.source, args.destination, args.poster)
