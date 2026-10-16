import { useId } from 'react'
import './FrenchDuo.css'

const sprite = '/french-duo-sticker.png'

export default function FrenchDuo() {
  const id = useId().replaceAll(':','')
  return <svg className="french-duo" viewBox="280 0 1030 1024" role="img" aria-label="French Duo with a red beret, striped shirt, scarf and baguette, outlined in white, waving and blinking">
    <defs>
      <clipPath id={`${id}-body-clip`}><rect x="380" y="20" width="855" height="970"/></clipPath>
      <clipPath id={`${id}-right-wing-clip`}><rect x="1240" y="550" width="245" height="230"/></clipPath>
      <linearGradient id={`${id}-lid-green`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#99e300"/><stop offset="100%" stopColor="#8cda00"/></linearGradient>
      <mask id={`${id}-eye-mask`} maskUnits="userSpaceOnUse" x="550" y="370" width="440" height="215">
        <ellipse cx="640" cy="478" rx="82" ry="100" fill="white"/><ellipse cx="897" cy="478" rx="82" ry="100" fill="white"/>
        <path d="M673 536c-15 2-14 22 4 19 32-5 52-62 91-53 35-10 53 49 89 54 18 3 23-16 8-20" fill="none" stroke="black" strokeWidth="18" strokeLinecap="round"/>
      </mask>
      <clipPath id={`${id}-lid-reveal`}><rect className="duo-eyelid-curtain" x="550" y="375" width="440" height="210"/></clipPath>
    </defs>
    <g className="duo-bob">
      <g className="duo-wing duo-wing-left">
        <path d="M502 600c-36-25-84-12-113 22-23 29-41 57-56 86-16 31-12 61 13 71 42 22 105-13 135-56 28-41 48-96 21-123Z" fill="#78C800" stroke="#FFF" strokeWidth="24" strokeLinejoin="round"/>
        <path d="M462 613c-24-9-47 9-63 32-19 22-30 40-40 62 29 11 62-8 85-35 21-26 33-52 18-59Z" fill="#98E000"/>
      </g>
      <g className="duo-wing duo-wing-right"><g transform="translate(-195 55)"><image href={sprite} width="1536" height="1024" clipPath={`url(#${id}-right-wing-clip)`}/></g></g>
      <image href={sprite} width="1536" height="1024" clipPath={`url(#${id}-body-clip)`}/>


      <g mask={`url(#${id}-eye-mask)`} clipPath={`url(#${id}-lid-reveal)`}><rect x="550" y="370" width="440" height="215" fill={`url(#${id}-lid-green)`}/></g>
    </g>
  </svg>
}
