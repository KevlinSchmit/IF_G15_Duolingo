import './FrenchDuo.css'

const sprite = '/french-duo-sticker.png'

export default function FrenchDuo() {
  return <svg className="french-duo" viewBox="280 0 1030 1024" role="img" aria-label="French Duo with a red beret, striped shirt, scarf and baguette, outlined in white, waving and blinking">
    <defs>
      <clipPath id="duo-body-clip"><rect x="380" y="20" width="855" height="970"/></clipPath>
      <clipPath id="duo-left-wing-clip"><rect x="50" y="550" width="250" height="230"/></clipPath>
      <clipPath id="duo-right-wing-clip"><rect x="1240" y="550" width="245" height="230"/></clipPath>
      <linearGradient id="duo-lid-green" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#99e300"/><stop offset="100%" stopColor="#8cda00"/></linearGradient>
      <mask id="duo-eye-mask" maskUnits="userSpaceOnUse" x="550" y="370" width="440" height="215">
        <ellipse cx="640" cy="478" rx="82" ry="100" fill="white"/><ellipse cx="897" cy="478" rx="82" ry="100" fill="white"/>
        <path d="M673 536c-15 2-14 22 4 19 32-5 52-62 91-53 35-10 53 49 89 54 18 3 23-16 8-20" fill="none" stroke="black" strokeWidth="18" strokeLinecap="round"/>
      </mask>
      <clipPath id="duo-lid-reveal"><rect className="duo-eyelid-curtain" x="550" y="375" width="440" height="210"/></clipPath>
    </defs>
    <g className="duo-bob">
      <g className="duo-wing duo-wing-left"><g transform="translate(225 58)"><image href={sprite} width="1536" height="1024" clipPath="url(#duo-left-wing-clip)"/></g></g>
      <g className="duo-wing duo-wing-right"><g transform="translate(-195 55)"><image href={sprite} width="1536" height="1024" clipPath="url(#duo-right-wing-clip)"/></g></g>
      <image href={sprite} width="1536" height="1024" clipPath="url(#duo-body-clip)"/>
      <g mask="url(#duo-eye-mask)" clipPath="url(#duo-lid-reveal)"><rect x="550" y="370" width="440" height="215" fill="url(#duo-lid-green)"/><path className="duo-closed-eye-lines" d="M602 493q38 21 76 0M859 493q38 21 76 0" fill="none" stroke="#303030" strokeWidth="10" strokeLinecap="round"/></g>
    </g>
  </svg>
}
