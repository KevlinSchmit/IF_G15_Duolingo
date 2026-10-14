import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const poses = [
  {name:'neutral',src:'/camille-cartoon.png'},
  {name:'wink',src:'/camille-idle-wink.png'},
  {name:'relaxed',src:'/camille-idle-relaxed.png'},
]
const routine = [{pose:1,duration:850},{pose:0,duration:3100},{pose:2,duration:2600},{pose:0,duration:1900}]
export default function CamilleIdle({active=true}) {
  const reduced=useReducedMotion()
  const [pose,setPose]=useState(reduced?0:1)
  useEffect(()=>{
    if(!active || reduced)return
    let timer
    let step=0
    const next=()=>{setPose(routine[step].pose);timer=setTimeout(()=>{step=(step+1)%routine.length;next()},routine[step].duration)}
    next()
    return()=>clearTimeout(timer)
  },[active,reduced])
  return <motion.div className="camille-idle" data-pose={poses[pose].name} role="img" aria-label="Camille smiles, waves and changes expression like an idle game character" animate={active&&!reduced ? {y:[0,-2,0],rotate:[-.4,.4,-.4]} : {y:0,rotate:0}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}>{poses.map((item,index)=><img key={item.name} src={item.src} alt="" aria-hidden="true" style={{display:pose===index ? 'block' : 'none'}}/>)}</motion.div>
}
