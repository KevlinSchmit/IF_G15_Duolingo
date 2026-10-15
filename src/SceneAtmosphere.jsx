import { useId } from 'react'
import { motion } from 'motion/react'

const clouds=[
  {x:90,y:88,scale:1,duration:24,drift:7},
  {x:274,y:74,scale:.68,duration:28,drift:-8},
  {x:574,y:100,scale:.6,duration:22,drift:8},
  {x:664,y:135,scale:.73,duration:26,drift:-7},
  {x:1138,y:83,scale:.78,duration:30,drift:9},
]
const lamps=[{x:68,y:216},{x:514,y:154},{x:802,y:207},{x:1116,y:207}]

export default function SceneAtmosphere({reduced,active=true}) {
  const id=useId().replaceAll(':','')
  const still=reduced||!active
  return <motion.g className={`scene-atmosphere ${still?'atmosphere-still':''}`} aria-hidden="true" initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:reduced?0:.45}}>
    <defs>
      <linearGradient id={`${id}-cloud`} x2="0" y2="1"><stop stopColor="#fffdf7"/><stop offset="1" stopColor="#fffaf0"/></linearGradient>
      <radialGradient id={`${id}-light`}><stop stopColor="#fff7ba" stopOpacity=".95"/><stop offset="1" stopColor="#fff7ba" stopOpacity="0"/></radialGradient>
    </defs>
    {clouds.map((cloud,index)=><g key={index} transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`}><g className="scene-cloud" style={{'--cloud-duration':`${cloud.duration}s`,'--cloud-drift':`${cloud.drift}px`,'--cloud-delay':`${-index*3}s`}}>
      <path d="M26 72C11 72 1 62 1 49 1 35 10 25 23 24 27 9 37 1 51 1 65 1 75 11 78 24 91 15 106 22 108 35 122 34 133 44 133 56 133 67 125 72 113 72Z" fill={`url(#${id}-cloud)`}/>
    </g></g>)}
    {lamps.map((lamp,index)=><g key={index} className="scene-lamp" style={{'--lamp-duration':`${5.8+index*.7}s`,'--lamp-delay':`${-index*1.8}s`}}>
      <ellipse className="lamp-glow" cx={lamp.x} cy={lamp.y} rx="42" ry="54" fill={`url(#${id}-light)`}/>
      <path className="lamp-pane" d={`M${lamp.x-19} ${lamp.y-22}H${lamp.x+19}L${lamp.x+12} ${lamp.y+22}H${lamp.x-12}Z`} fill="#fff7c4"/>
    </g>)}
  </motion.g>
}
