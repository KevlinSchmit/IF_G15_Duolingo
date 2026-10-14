import { useId } from 'react'
import './FrenchDuo.css'

const sprite = '/french-duo-sticker.png'
const bodySprite = '/french-duo-body.png'

export default function FrenchDuo({ cinematic = false }) {
  const id = useId().replaceAll(':','')
  return <svg className="french-duo" viewBox="280 0 1030 1024" role="img" aria-label="French Duo with a red beret, striped shirt, scarf and baguette, outlined in white, waving and blinking">
    <defs>
      <clipPath id={`${id}-foot-left-clip`}><ellipse cx="665" cy="913" rx="74" ry="55"/></clipPath>
      <clipPath id={`${id}-foot-right-clip`}><ellipse cx="854" cy="913" rx="73" ry="55"/></clipPath>
      <mask id={`${id}-without-feet`}><rect width="1536" height="1024" fill="white"/><ellipse cx="665" cy="918" rx="75" ry="53" fill="black"/><ellipse cx="854" cy="918" rx="74" ry="53" fill="black"/></mask>
      <clipPath id={`${id}-body-clip`}><rect x="380" y="20" width="855" height="970"/></clipPath>
      <clipPath id={`${id}-left-wing-clip`}><rect x="50" y="550" width="250" height="230"/></clipPath>
      <clipPath id={`${id}-right-wing-clip`}><rect x="1240" y="550" width="245" height="230"/></clipPath>
      <linearGradient id={`${id}-lid-green`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#99e300"/><stop offset="100%" stopColor="#8cda00"/></linearGradient>
      <mask id={`${id}-eye-mask`} maskUnits="userSpaceOnUse" x="550" y="370" width="440" height="215">
        <ellipse cx="640" cy="478" rx="82" ry="100" fill="white"/><ellipse cx="897" cy="478" rx="82" ry="100" fill="white"/>
        <path d="M673 536c-15 2-14 22 4 19 32-5 52-62 91-53 35-10 53 49 89 54 18 3 23-16 8-20" fill="none" stroke="black" strokeWidth="18" strokeLinecap="round"/>
      </mask>
      <clipPath id={`${id}-lid-reveal`}><rect className="duo-eyelid-curtain" x="550" y="375" width="440" height="210"/></clipPath>
    </defs>
    <g className="duo-bob">
      <g className="duo-wing duo-wing-left"><g transform="translate(225 58)"><image href={sprite} width="1536" height="1024" clipPath={`url(#${id}-left-wing-clip)`}/></g>

      </g>
      <g className="duo-wing duo-wing-right"><g transform="translate(-195 55)"><image href={sprite} width="1536" height="1024" clipPath={`url(#${id}-right-wing-clip)`}/></g></g>
      <image href={cinematic ? bodySprite : sprite} width="1536" height="1024" clipPath={`url(#${id}-body-clip)`} mask={cinematic ? `url(#${id}-without-feet)` : undefined}/>
      {cinematic && <>
        <g className="duo-foot-left"><image href={bodySprite} width="1536" height="1024" clipPath={`url(#${id}-foot-left-clip)`}/></g>
        <g className="duo-foot-right"><image href={bodySprite} width="1536" height="1024" clipPath={`url(#${id}-foot-right-clip)`}/></g>
        <g className="duo-baguette"><image href="/french-duo-baguette.png" width="1536" height="1024"/></g>
      </>}

      <g mask={`url(#${id}-eye-mask)`} clipPath={`url(#${id}-lid-reveal)`}><rect x="550" y="370" width="440" height="215" fill={`url(#${id}-lid-green)`}/></g>
    </g>
  </svg>
}
