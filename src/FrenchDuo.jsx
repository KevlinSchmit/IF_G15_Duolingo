import './FrenchDuo.css'

// Layered vector artwork keeps the wings and eyelids independently animatable.
export default function FrenchDuo() {
  return <svg className="french-duo" viewBox="0 0 360 390" role="img" aria-label="Duo wearing a red beret and striped French shirt, waving his wings and blinking">
    <defs><clipPath id="duo-shirt"><path d="M85 191c-23 32-17 81 10 113 22 27 104 39 149 0 26-23 31-79 12-114Z"/></clipPath></defs>
    <ellipse cx="174" cy="362" rx="127" ry="12" fill="#3f9f00" opacity=".3"/>
    <g className="duo-bob">
      <g className="duo-wing duo-wing-left"><path d="M96 206c-20-2-48 29-61 64-7 18-13 42-1 47 20 7 52-13 67-40 14-25 20-58-5-71Z" fill="#78c800"/><path d="M48 245c10 11 26 13 42 10" fill="none" stroke="#58a700" strokeWidth="7" strokeLinecap="round"/></g>
      <g className="duo-wing duo-wing-right"><path d="M248 211c21-5 40 18 50 45 8 22 8 52-6 60-18 10-43-13-55-38-12-28-13-59 11-67Z" fill="#78c800"/></g>
      <path d="M109 326c-13 2-23 12-18 23 4 9 27 10 37 2 12-10 5-27-19-25ZM211 324c-14 3-24 16-18 26 7 11 29 4 35-7 7-13-3-23-17-19Z" fill="#ffb600"/>
      <path d="M75 117C74 69 98 31 120 48l27 22h72l29-23c23-10 40 27 39 76l-7 116c-3 66-37 96-99 96-64 0-105-27-107-88l1-130Z" fill="#78c800"/>
      <path d="M100 102c-12 21-14 52-4 77 11 27 35 38 71 19 25 24 56 13 72-9 22-30 19-70 1-91-17-20-42-16-58-6-26-17-64-9-82 10Z" fill="#9ce325"/>
      <path d="M117 84c25-6 39 6 52 15 16-13 42-15 65-4" fill="none" stroke="#89d900" strokeWidth="12" strokeLinecap="round"/>
      <g clipPath="url(#duo-shirt)"><path d="M60 183h220v151H60Z" fill="#fff"/><path d="M52 194q112 56 237 1v28q-124 64-237 0v-29ZM51 252q116 60 239 1v29q-126 63-238 1l-1-31Z" fill="#1cb0f6"/><path d="M79 303q100 39 182-4v21q-100 42-179 3Z" fill="#e5e5e5"/></g>
      <path d="M86 190q89 57 175 0" fill="none" stroke="#1cb0f6" strokeWidth="12" strokeLinecap="round"/>
      <g className="duo-eyes">
        <ellipse cx="129" cy="144" rx="29" ry="35" fill="#fff"/><ellipse cx="220" cy="151" rx="27" ry="31" fill="#fff"/>
        <ellipse cx="136" cy="139" rx="16" ry="23" fill="#353535"/><ellipse cx="217" cy="146" rx="15" ry="22" fill="#353535"/>
        <circle cx="128" cy="126" r="8" fill="#fff"/><circle cx="210" cy="134" r="7" fill="#fff"/>
      </g>
      <g className="duo-closed-eyes" fill="none" stroke="#353535" strokeWidth="8" strokeLinecap="round"><path d="M110 145q19 16 38 0M203 152q16 14 32 0"/></g>
      <path d="M157 173c4-17 30-17 35 1l-6 27c-3 8-13 10-18 2l-11-30Z" fill="#ffc800"/><path d="m172 190 13 8-2 12c-4 9-10 7-13 0l2-20Z" fill="#ffb600"/><ellipse cx="175" cy="169" rx="8" ry="4" fill="#fff"/>
      <path d="M173 169c-13-23-21 19-40 16-6-1-8-6-7-10M175 169c11-20 18 19 39 17 7-1 10-7 8-12" fill="none" stroke="#252525" strokeWidth="7" strokeLinecap="round"/>
      <path d="M112 48c-14-31 16-48 50-31 35 17 66 38 99 28 14-4 23 3 15 19-20 40-126 23-164-16Z" fill="#ce252c"/><path d="M115 37c-1-24 22-29 49-17 35 15 68 38 98 28 9-3 17-3 16 5-11 33-110 18-163-16Z" fill="#e23237"/><path d="M198 37q-4-13 8-15" fill="none" stroke="#ce252c" strokeWidth="7" strokeLinecap="round"/>
      <g transform="rotate(30 277 284)"><rect x="247" y="248" width="79" height="46" rx="23" fill="#b56832"/><path d="m268 255-4 21M291 255l-4 21M312 258l-4 19" stroke="#d58b48" strokeWidth="9" strokeLinecap="round"/></g>
    </g>
  </svg>
}
