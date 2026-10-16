import { useEffect, useId } from 'react'
import { animate, motion, useIsPresent, useMotionValue, useTransform } from 'motion/react'

// All parts share one pose: the wing silhouette, grip and fabric never run on
// independent rotations. Shoulder roots stay well inside the body silhouette.
const REST = { lx: 103, ly: 249, rx: 537, ry: 249, x: 0, y: 0, tilt: 0, sx: 1, sy: 1, feet: 0, drape: 0, gaze: 0 }
const poses = [
  [0, {}],
  [.65, { lx: 96, ly: 236, rx: 535, ry: 254, x: -4, tilt: -2 }],
  [1.15, { lx: 102, ly: 250, rx: 544, ry: 207, x: 4, tilt: 2, gaze: 3 }],
  [1.5, { lx: 102, ly: 250, rx: 539, ry: 246, tilt: 1 }],
  [1.85, { lx: 102, ly: 247, rx: 545, ry: 207, x: 3, tilt: 2, gaze: 3 }],
  [2.35, {}],
  [2.95, { lx: 117, ly: 269, rx: 523, ry: 269, y: 10, sx: 1.025, sy: .965 }],
  [3.28, { lx: 100, ly: 199, rx: 540, ry: 199, y: -66, sx: .985, sy: 1.035, feet: 10, drape: -2 }],
  [3.65, { lx: 111, ly: 256, rx: 529, ry: 256, y: 7, sx: 1.035, sy: .955 }],
  [4.05, {}],
  [4.7, { y: -3, sy: 1.008 }],
  [5.35, { lx: 103, ly: 196, rx: 537, ry: 196, y: -4, drape: -3 }],
  [5.95, { lx: 99, ly: 195, rx: 534, ry: 222, x: -7, tilt: -4, gaze: -3 }],
  [6.6, { lx: 106, ly: 222, rx: 541, ry: 195, x: 7, tilt: 4, gaze: 3 }],
  [7.3, { lx: 103, ly: 213, rx: 537, ry: 213, y: -2 }],
  [7.95, { lx: 109, ly: 261, rx: 531, ry: 261, y: 5, sy: .985 }],
  [8.5, {}],
  [9.15, { y: -3, sy: 1.008 }],
  [9.8, {}],
].map(([time, values]) => [time, { ...REST, ...values }])
const duration = poses.at(-1)[0]
const ease = value => value * value * (3 - 2 * value)
function poseAt(time) {
  const index = Math.max(1, poses.findIndex(([end]) => end >= time))
  const [start, from] = poses[index - 1], [end, to] = poses[index]
  const progress = ease(Math.max(0, Math.min(1, (time - start) / (end - start))))
  return Object.fromEntries(Object.keys(REST).map(key => [key, from[key] + (to[key] - from[key]) * progress]))
}

function wingPath(pose, side) {
  const left = side === 'left', sx = left ? 173 : 467, sy = 337
  const hx = left ? pose.lx : pose.rx, hy = left ? pose.ly : pose.ry
  const direction = left ? 1 : -1, x = offset => hx + offset * direction
  const root = offset => sx + offset * direction
  return `M${root(18)} 304 C${root(-18)} 299 ${x(22)} ${hy + 12} ${x(8)} ${hy - 12} C${x(-2)} ${hy - 31} ${x(-29)} ${hy - 29} ${x(-31)} ${hy - 6} C${x(-34)} ${hy + 39} ${root(-59)} ${sy + 26} ${root(-12)} ${sy + 37} C${root(14)} ${sy + 44} ${root(35)} ${sy + 5} ${root(18)} 304Z`
}
function flagPath({ lx, ly, rx, ry, drape }) {
  const top = (ly + ry) / 2 + 89 + drape
  return `M${lx} ${ly} C${lx + 38} ${ly + 45} 239 ${top + 2} 320 ${top} C401 ${top + 2} ${rx - 38} ${ry + 45} ${rx} ${ry} Q${rx + 12} ${ry + 72} ${rx - 19} ${ry + 155} C436 ${top + 160} 204 ${top + 160} ${lx + 19} ${ly + 155} Q${lx - 12} ${ly + 72} ${lx} ${ly}Z`
}
function foldPath({ lx, ly, rx, ry, drape }) {
  const top = (ly + ry) / 2 + 89 + drape
  return `M${lx + 19} ${ly + 62} C222 ${top + 117} 418 ${top + 117} ${rx - 19} ${ry + 62} C416 ${top + 164} 224 ${top + 164} ${lx + 19} ${ly + 62}Z`
}
function gripPath({ lx, ly, rx, ry }, side) {
  const left = side === 'left', x = left ? lx : rx, y = left ? ly : ry, d = left ? 1 : -1
  // A rounded wing tip overlaps the top corner of the fabric, like a small
  // curled feather. This contact stays visible even when the flag is raised.
  return `M${x - 21 * d} ${y + 2} C${x - 27 * d} ${y - 19} ${x - 8 * d} ${y - 26} ${x + 4 * d} ${y - 12} L${x + 12 * d} ${y + 2} Q${x + 15 * d} ${y + 11} ${x + 6 * d} ${y + 14} Q${x - 11 * d} ${y + 17} ${x - 21 * d} ${y + 2}Z`
}
function blinkAt(time) {
  for (const center of [.43, 2.45, 4.4, 7.65, 9.15]) {
    const distance = Math.abs(time - center)
    if (distance < .115) return Math.max(0, Math.min(1, distance / .085))
  }
  return 1
}

export default function ThankYouDuo({ reduced }) {
  const id = useId().replaceAll(':', ''), present = useIsPresent()
  const clock = useMotionValue(0)
  useEffect(() => {
    if (reduced || !present) return
    clock.set(0)
    const control = animate(clock, duration, { duration, ease: 'linear', repeat: Infinity })
    return () => control.stop()
  }, [clock, reduced, present])
  const pose = useTransform(clock, time => reduced ? REST : poseAt(time))
  const leftWing = useTransform(pose, value => wingPath(value, 'left'))
  const rightWing = useTransform(pose, value => wingPath(value, 'right'))
  const flag = useTransform(pose, flagPath), fold = useTransform(pose, foldPath)
  const leftGrip = useTransform(pose, value => gripPath(value, 'left'))
  const rightGrip = useTransform(pose, value => gripPath(value, 'right'))
  const actorTransform = useTransform(pose, value => `translate(${value.x}px, ${value.y}px) translate(320px, 538px) rotate(${value.tilt}deg) scale(${value.sx}, ${value.sy}) translate(-320px, -538px)`)
  const shadowScale = useTransform(pose, value => 1 + Math.min(value.y, 0) / 165)
  const shadowOpacity = useTransform(pose, value => .19 + Math.min(value.y, 0) / 600)
  const leftFoot = useTransform(pose, value => -value.feet)
  const rightFoot = useTransform(pose, value => value.feet)
  const eyes = useTransform(clock, time => reduced ? 1 : blinkAt(time))
  const eyelids = useTransform(eyes, value => {
    const edge = 180 + (1 - value) * 132, curve = (1 - value) * 13
    return [175, 363].map(x => `M${x} 180H${x + 102}V${edge}Q${x + 51} ${edge + curve} ${x} ${edge}Z`).join('')
  })
  const gaze = useTransform(pose, value => value.gaze)
  return <svg className="thank-you-character" viewBox="0 0 640 640" role="img" aria-label="French Duo greeting you, waving his tricolor flag and doing a happy hop">
    <defs>
      <clipPath id={`${id}-flag`} clipPathUnits="userSpaceOnUse"><motion.path className="thank-you-flag-shape" d={flag}/></clipPath>
      <clipPath id={`${id}-eyes`}><ellipse cx="226" cy="245" rx="49" ry="62"/><ellipse cx="414" cy="245" rx="49" ry="62"/></clipPath>
    </defs>
    <ellipse cx="320" cy="570" rx="119" ry="12" fill="#748657" opacity=".08"/>
    <motion.ellipse className="thank-you-duo-shadow" cx="320" cy="570" rx="102" ry="10" fill="#748657" style={{ scaleX: shadowScale, opacity: shadowOpacity, originX: '320px', originY: '570px', transformBox: 'view-box' }}/>
    <motion.g className="thank-you-duo-jumper" style={{ transform: actorTransform, originX: '0px', originY: '0px', transformBox: 'view-box' }}>
      <motion.path className="thank-you-wing thank-you-wing-left" d={leftWing} fill="#58cc02"/>
      <motion.path className="thank-you-wing thank-you-wing-right" d={rightWing} fill="#58cc02"/>
      <motion.path style={{ rotate: leftFoot, originX: '276px', originY: '536px', transformBox: 'view-box' }} d="M255 515Q260 506 276 514L299 529Q315 542 304 555Q295 567 280 558L254 543Q242 535 255 515Z" fill="#ffab00"/>
      <motion.path style={{ rotate: rightFoot, originX: '364px', originY: '536px', transformBox: 'view-box' }} d="M385 515Q380 506 364 514L341 529Q325 542 336 555Q345 567 360 558L386 543Q398 535 385 515Z" fill="#ffab00"/>
      <path className="thank-you-duo-body" d="M143 275C132 247 135 201 137 163C140 111 156 77 187 75C225 73 265 110 320 112C375 110 415 73 453 75C484 77 500 111 503 163C505 201 508 247 497 275C514 326 507 400 478 444C444 495 393 516 320 516C247 516 196 495 162 444C133 400 126 326 143 275Z" fill="#58cc02"/>
      <path d="M157 246C155 208 171 169 188 151Q196 141 203 155L221 180L236 131Q241 118 249 131L288 186Q303 206 304 235L304 279Q301 315 271 326C222 342 162 310 157 269Z" fill="#89e219"/>
      <path d="M157 246C155 208 171 169 188 151Q196 141 203 155L221 180L236 131Q241 118 249 131L288 186Q303 206 304 235L304 279Q301 315 271 326C222 342 162 310 157 269Z" transform="translate(640 0) scale(-1 1)" fill="#89e219"/>
      <motion.g className="thank-you-eyes">
        <ellipse cx="226" cy="245" rx="49" ry="62" fill="#fff"/><ellipse cx="414" cy="245" rx="49" ry="62" fill="#fff"/>
        <motion.g style={{ x: gaze }}>
          <ellipse cx="239" cy="251" rx="25" ry="37" fill="#424744"/><ellipse cx="401" cy="251" rx="25" ry="37" fill="#424744"/>
          <ellipse cx="226" cy="231" rx="12" ry="14" fill="#fff"/><ellipse cx="388" cy="231" rx="12" ry="14" fill="#fff"/>
        </motion.g>
        <motion.path className="thank-you-eyelids" d={eyelids} fill="#89e219" clipPath={`url(#${id}-eyes)`}/>
      </motion.g>
      <path d="M291 284H349V303Q346 328 320 329Q294 326 291 303Z" fill="#ff9600"/>
      <path d="M285 287Q287 263 320 260Q353 263 355 287Q321 303 285 287Z" fill="#ffc800"/>
      <ellipse cx="320" cy="273" rx="15" ry="6" fill="#ffdc4d"/>
      <g className="thank-you-flag" clipPath={`url(#${id}-flag)`}>
        <rect x="0" y="140" width="246" height="390" fill="#1cb0f6"/><rect x="246" y="140" width="148" height="390" fill="#fff"/><rect x="394" y="140" width="246" height="390" fill="#ff4b4b"/>
        <motion.path d={fold} fill="#173e6d" opacity=".075"/>
      </g>
      <motion.path className="thank-you-grip thank-you-grip-left" d={leftGrip} fill="#58cc02"/>
      <motion.path className="thank-you-grip thank-you-grip-right" d={rightGrip} fill="#58cc02"/>
    </motion.g>
  </svg>
}
