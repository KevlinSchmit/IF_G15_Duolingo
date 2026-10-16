// A quiet Paris street: a bakery, mansard roofs, lamps and a distant tower.
function Building({x,y,width=150,height=270,shop=false}) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height={height} rx="7" fill="#fae5bf"/>
    <path d={`M-9 8 12-34H${width-12}L${width+9} 8Z`} fill="#7099b0"/>
    <path d={`M-4 9H${width+4}`} stroke="#4f7b96" strokeWidth="8" strokeLinecap="round"/>
    <rect x={width-34} y="-52" width="14" height="24" rx="3" fill="#6288a0"/>
    {(height>=280?[37,99,161]:[37,99]).map(row=><g key={row}>
      {[24,width-49].map(col=><g key={col}><rect x={col} y={row} width="25" height="35" rx="6" fill="#a9cad7"/><path d={`M${col+12.5} ${row+2}v31M${col+2} ${row+18}h21`} stroke="#fff8e9" strokeWidth="3"/><path d={`M${col-5} ${row+39}h35`} stroke="#d5c298" strokeWidth="4" strokeLinecap="round"/></g>)}
    </g>)}
    {shop?<g>
      <rect x="13" y={height-65} width={width-26} height="65" rx="5" fill="#9fc4cc"/>
      <path d={`M9 ${height-77}H${width-9}l9 29H0Z`} fill="#fff8e9"/>
      {[0,1,2,3].map(i=><path key={i} d={`M${9+i*(width-18)/4} ${height-77}h${(width-18)/8}l3 29H${i*(width-18)/4}Z`} fill="#e78c77"/>)}
      <rect x={width*.43} y={height-43} width="24" height="43" rx="7" fill="#6b9da8"/>
    </g>:<path d={`M${width/2-19} ${height}v-42c0-26 38-26 38 0v42Z`} fill="#8eb7c4"/>}
  </g>
}

function Lamp({x,y}) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0 5v185m-14 0h28M-7 185h14" stroke="#567e99" strokeWidth="7" strokeLinecap="round"/>
    <path d="m-18 10 7 48h22l7-48Z" fill="#f9dd8b" stroke="#567e99" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M-23 10Q0-20 23 10Z" fill="#567e99"/><path d="M0-17v8" stroke="#567e99" strokeWidth="5" strokeLinecap="round"/>
  </g>
}

export default function ThankYouStreet() {
  return <svg className="thank-you-street" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <ellipse className="thank-you-light-canvas" cx="800" cy="530" rx="470" ry="285" fill="#fff9e9"/>
    <path d="M248 795q552-138 1104 0-183 82-552 86-369-4-552-86Z" fill="#dcecca"/>
    <path d="M325 805q475-87 950 0" fill="none" stroke="#fff9e9" strokeWidth="4" strokeLinecap="round"/>
    <g className="thank-you-street-left" opacity=".92">
      <Building x={124} y={450} width={150} height={320}/>
      <Building x={279} y={510} width={168} height={260} shop/>
      <Lamp x={472} y={570}/>
      <path d="M85 775v-70" stroke="#90b06a" strokeWidth="8"/><path d="M85 717C12 724 37 638 79 657c27-49 78 2 49 37 22 30-12 45-43 23Z" fill="#abd48b"/>
      <rect x="56" y="757" width="58" height="32" rx="9" fill="#e9cf9a"/>
    </g>
    <g className="thank-you-street-right" opacity=".9">
      <g transform="translate(1150 330)" fill="#a6c8c0">
        <path d="M12 0h10l8 97 20 69 39 65H-55l39-65 20-69L12 0Z"/>
        <path d="M17-30V0M-7 98h48m-69 68h90m-101 65H73" stroke="#8fb7b0" strokeWidth="9" strokeLinecap="round"/>
        <path d="m10 45 16 50-39 69h60L8 99l16-53" fill="none" stroke="#d4e6d7" strokeWidth="5" strokeLinejoin="round"/>
        <path d="M0 231c0-45 34-45 34 0" fill="#fff9e9"/>
      </g>
      <Building x={1255} y={480} width={154} height={290}/>
      <Building x={1415} y={545} width={118} height={225}/>
      <Lamp x={1222} y={574}/>
      <path d="M1470 781v-66" stroke="#90b06a" strokeWidth="8"/><path d="M1470 728c-62 8-67-62-24-65 18-47 75-16 64 24 32 30-2 58-40 41Z" fill="#abd48b"/>
      <rect x="1440" y="758" width="60" height="31" rx="9" fill="#e9cf9a"/>
    </g>
    <g fill="#fff7df" opacity=".7"><path d="M352 303q-14-25-39-11-23-3-28 16h89q-2-15-22-5Z"/><path d="M1295 245q-16-30-47-15-26-2-32 20h106q-3-16-27-5Z"/></g>
  </svg>
}
