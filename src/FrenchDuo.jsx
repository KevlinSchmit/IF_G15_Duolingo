import './FrenchDuo.css'

const sprite = '/french-duo-sticker.png'

export default function FrenchDuo() {
  return <svg className="french-duo" viewBox="280 0 1030 1024" role="img" aria-label="French Duo with a red beret, striped shirt, scarf and baguette, outlined in white, waving and blinking">
    <defs>
      <clipPath id="duo-body-clip"><rect x="380" y="20" width="855" height="970"/></clipPath>
      <clipPath id="duo-left-wing-clip"><rect x="50" y="550" width="250" height="230"/></clipPath>
      <clipPath id="duo-right-wing-clip"><rect x="1240" y="550" width="245" height="230"/></clipPath>
      <clipPath id="duo-eye-clip"><path d="M638 389c-43 0-68 37-68 87 0 55 18 88 68 88 15 0 23-4 28-9-12-11-6-25 7-26 17-20 35-29 40-34v-22c0-50-27-84-75-84ZM897 389c-45 0-70 36-70 84v22c5 5 24 17 38 34 13 0 20 15 6 27 8 6 14 8 26 8 51 0 70-33 70-88 0-50-25-87-70-87Z"/></clipPath>
    </defs>
    <g className="duo-bob">
      <g className="duo-wing duo-wing-left"><g transform="translate(225 58)"><image href={sprite} width="1536" height="1024" clipPath="url(#duo-left-wing-clip)"/></g></g>
      <g className="duo-wing duo-wing-right"><g transform="translate(-195 55)"><image href={sprite} width="1536" height="1024" clipPath="url(#duo-right-wing-clip)"/></g></g>
      <image href={sprite} width="1536" height="1024" clipPath="url(#duo-body-clip)"/>
      <g clipPath="url(#duo-eye-clip)"><g className="duo-eyelids"><ellipse cx="640" cy="478" rx="80" ry="97" fill="#95df05"/><ellipse cx="897" cy="478" rx="80" ry="97" fill="#95df05"/><path d="M603 478q37 24 73 0M860 478q37 24 73 0" fill="none" stroke="#303030" strokeWidth="12" strokeLinecap="round"/></g></g>
    </g>
  </svg>
}
