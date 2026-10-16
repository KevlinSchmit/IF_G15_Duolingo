// Small, individually drawn city illustrations in the presentation's rounded palette.
export default function WorldLandmark({city}) {
  const props={viewBox:'0 0 120 126',width:120,height:126,fill:'none','aria-hidden':true}
  if(city==='paris')return <svg {...props}>
    <ellipse cx="60" cy="118" rx="42" ry="5" fill="#cee5ef"/>
    <path d="M56 22h8l3 38 10 29 18 26H25l18-26 10-29 3-38Z" fill="#3a7cc0"/>
    <path d="M60 7v17M45 62h30M35 91h50M30 114h60" stroke="#285e9b" strokeWidth="6" strokeLinecap="round"/>
    <path d="m56 40 10 21-17 29h22L54 64l10-22M44 95l16 12 16-12" stroke="#a2d6f1" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M48 115c0-22 24-22 24 0" fill="#f7fcfe"/><path d="M50 28h20" stroke="#285e9b" strokeWidth="5" strokeLinecap="round"/>
    <path d="m93 31 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z" fill="#ffc800"/>
  </svg>
  if(city==='tokyo')return <svg {...props}>
    <ellipse cx="60" cy="118" rx="43" ry="5" fill="#f3dbd8"/>
    <path d="m57 27 6 0 6 39 11 29 14 20H26l14-20 11-29 6-39Z" fill="#f5765c"/>
    <path d="M60 6v24M46 65h28M34 95h52" stroke="#df5547" strokeWidth="5" strokeLinecap="round"/>
    <path d="m56 41 9 22-19 31h28L55 67l9-25M43 99l17 12 17-12" stroke="#fff9e9" strokeWidth="3" strokeLinejoin="round"/>
    <rect x="45" y="62" width="30" height="9" rx="3" fill="#fff4da"/>
    <path d="M47 115c0-22 26-22 26 0" fill="#fff9f3"/><path d="M86 22c7-13 17-9 19 0-2 10-12 12-19 0Z" fill="#ffb9cf"/>
    <circle cx="95" cy="22" r="3" fill="#ffe8a3"/>
  </svg>
  if(city==='seoul')return <svg {...props}>
    <ellipse cx="60" cy="118" rx="50" ry="5" fill="#d2e8db"/>
    <path d="M15 109h90v8H15z" fill="#c4d5cc"/><rect x="25" y="67" width="70" height="42" rx="3" fill="#e9c99b"/>
    <path d="M25 86h70M30 107V77m18 30V77m24 30V77m18 30V77" stroke="#cf6252" strokeWidth="5"/>
    <path d="M20 69q18-3 21-18h38q3 15 21 18H20Z" fill="#39866f"/><path d="M15 67q21 9 45 4 24 5 45-4" stroke="#245b51" strokeWidth="5" strokeLinecap="round"/>
    <rect x="41" y="41" width="38" height="14" rx="2" fill="#cf6252"/>
    <path d="M33 43q20-4 27-19 7 15 27 19H33Z" fill="#39866f"/><path d="M30 42q30 8 60 0" stroke="#245b51" strokeWidth="5" strokeLinecap="round"/>
    <path d="M60 17v7" stroke="#ddab47" strokeWidth="4" strokeLinecap="round"/><rect x="53" y="88" width="14" height="21" rx="6" fill="#4f6f65"/>
    <path d="M43 78h34" stroke="#f3deae" strokeWidth="3"/>
  </svg>
  if(city==='rome')return <svg {...props}>
    <ellipse cx="60" cy="117" rx="52" ry="6" fill="#ecdfca"/>
    <path d="M12 55q46-30 96-7v61q-43 18-96-1V55Z" fill="#e5b77d"/>
    <path d="M12 55q45 16 96-7v13q-48 20-96 6V55Z" fill="#f4d5a6"/>
    <path d="M12 81q46 15 96-7v9q-49 22-96 8V81Z" fill="#c89359"/>
    <path d="M12 104q46 16 96-7v11q-48 22-96 1v-5Z" fill="#f4d5a6"/>
    {[22,39,56,73,90].map((x,i)=><g key={x} transform={`translate(${x} ${i>2?-4*(i-2):0})`}><path d="M0 78V67c0-9 10-9 10 0v11Z" fill="#a16f47"/><path d="M0 103V94c0-9 10-9 10 0v9Z" fill="#a16f47"/><path d="M0 65c0-9 10-9 10 0" stroke="#fff0d3" strokeWidth="2"/></g>)}
    <path d="m12 55 2-13 14-1v9l14-4V35l16-1v11" fill="#e5b77d"/><path d="M65 27c4-7 11-7 15 0" stroke="#8ab76e" strokeWidth="4" strokeLinecap="round"/>
  </svg>
  if(city==='beijing')return <svg {...props}>
    <ellipse cx="60" cy="118" rx="50" ry="5" fill="#e4ded3"/>
    <path d="M16 109h88v8H16zM23 101h74v9H23z" fill="#d7d8d2"/>
    <path d="M32 77h56v25H32z" fill="#c94f41"/><path d="M40 58h40v20H40zM47 41h26v18H47z" fill="#e2aa60"/>
    <path d="M17 81q29-6 43-19 14 13 43 19Z" fill="#3578ad"/><path d="M15 81q44 12 90 0" stroke="#285e9b" strokeWidth="4" strokeLinecap="round"/>
    <path d="M31 60q18-5 29-19 11 14 29 19Z" fill="#4089b8"/><path d="M29 60q32 9 62 0" stroke="#285e9b" strokeWidth="4" strokeLinecap="round"/>
    <path d="M40 43q13-5 20-18 7 13 20 18Z" fill="#4089b8"/><path d="M38 43q22 7 44 0" stroke="#285e9b" strokeWidth="4" strokeLinecap="round"/>
    <path d="M60 17v10" stroke="#d5a549" strokeWidth="4" strokeLinecap="round"/><circle cx="60" cy="16" r="4" fill="#ffc64e"/>
    <path d="M40 91v10m13-10v10m14-10v10m13-10v10" stroke="#f9d6a0" strokeWidth="4"/>
  </svg>
  return <svg {...props}>
    <ellipse cx="60" cy="117" rx="52" ry="5" fill="#e6dece"/>
    <path d="M13 62h94v51H13z" fill="#e6c69b"/><path d="M9 60h102v9H9zM9 108h102v7H9z" fill="#d3ab78"/>
    <path d="M40 43h40v20H40z" fill="#f1d6ad"/><path d="M35 43h50v6H35z" fill="#d3ab78"/>
    <path d="m48 42 12-12 12 12Z" fill="#e6c69b"/><circle cx="60" cy="30" r="4" fill="#c49b68"/>
    {[25,51,77].map(x=><path key={x} d={`M${x} 108V86c0-14 18-14 18 0v22Z`} fill="#fff9ed"/>)}
    <path d="M19 71v34m29-34v34m24-34v34m29-34v34" stroke="#f6e2bf" strokeWidth="4"/>
    <path d="M18 52v10m12-10v10m60-10v10m12-10v10" stroke="#c49b68" strokeWidth="5" strokeLinecap="round"/>
    <path d="M55 51h10v10H55z" fill="#89ad87"/>
  </svg>
}
