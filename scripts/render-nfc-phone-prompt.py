"""Render a silent, seamless handheld-phone demonstration from its generated keyframe.

This is an animated photographic keyframe with camera motion and NFC pulses,
not independently generated live-action footage. Requires Pillow and ffmpeg.
Run from the repository root: python3 scripts/render-nfc-phone-prompt.py
"""

from math import cos, pi, sin
from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts/assets/nfc-phone-keyframe.webp"
VIDEO = ROOT / "public/videos/nfc-phone-prompt.mp4"
POSTER = ROOT / "public/videos/nfc-phone-prompt-poster.webp"
WIDTH, HEIGHT, FPS, FRAMES = 1280, 720, 30, 180


def main():
    source = Image.open(SOURCE).convert("RGBA")
    if source.size != (1672, 941):
        raise ValueError("The generated phone keyframe must be 1672 × 941")
    scale = max(WIDTH / source.width, HEIGHT / source.height)
    encoder = subprocess.Popen([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-f", "rawvideo", "-pixel_format", "rgb24",
        "-video_size", f"{WIDTH}x{HEIGHT}", "-framerate", str(FPS),
        "-i", "pipe:0", "-an", "-c:v", "libx264", "-crf", "19",
        "-preset", "medium", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(VIDEO),
    ], stdin=subprocess.PIPE)
    try:
        for index in range(FRAMES):
            phase = 2 * pi * index / FRAMES
            pulse = (1 - cos(phase * 3)) / 2
            # The screen remains registered to the physical phone. Only the
            # existing NFC waves and HINT control receive a subtle live pulse.
            glow = Image.new("RGBA", source.size)
            draw = ImageDraw.Draw(glow)
            draw.ellipse((962, 423, 1021, 480), fill=(28, 176, 246, int(32 * pulse)))
            glow = glow.filter(ImageFilter.GaussianBlur(7))
            waves = Image.new("RGBA", source.size)
            draw = ImageDraw.Draw(waves)
            for radius in (7, 12, 18):
                draw.arc((979-radius, 451-radius, 979+radius, 451+radius),
                         -65, 65, fill=(28, 176, 246, int(145 * pulse)), width=3)
            draw.rounded_rectangle((718, 786, 895, 851), radius=31,
                                   fill=(238, 255, 217, int(11 * pulse)))
            frame = Image.alpha_composite(Image.alpha_composite(source, glow), waves)
            # Periodic position, scale and roll make the end join the start
            # without a cut, while leaving the entire phone inside the shot.
            zoom = scale * (1.004 + .008 * (1-cos(phase)) / 2)
            angle = .0015 * sin(phase)
            ca, sa = cos(angle) / zoom, sin(angle) / zoom
            center_x = WIDTH / 2 + .6 * sin(phase)
            center_y = HEIGHT / 2 + .4 * sin(phase * 2)
            inverse = (ca, sa, source.width/2-ca*center_x-sa*center_y,
                       -sa, ca, source.height/2+sa*center_x-ca*center_y)
            frame = frame.transform((WIDTH, HEIGHT), Image.Transform.AFFINE,
                                    inverse, Image.Resampling.BICUBIC).convert("RGB")
            if index == 0:
                frame.save(POSTER, quality=94)
            encoder.stdin.write(frame.tobytes())
    finally:
        encoder.stdin.close()
        status = encoder.wait()
    if status:
        raise RuntimeError(f"ffmpeg exited with {status}")
    print(f"Rendered {FRAMES} frames at {FPS} fps: {VIDEO}")


if __name__ == "__main__":
    main()
