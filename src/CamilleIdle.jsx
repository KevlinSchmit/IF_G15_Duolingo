import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const poses = [
  {name:'neutral',src:'/camille-cartoon.png'},
  {name:'wink',src:'/camille-idle-wink.png'},
  {name:'relaxed',src:'/camille-idle-relaxed.png'},
  {name:'confident',src:'/camille-idle-confident.png'},
]
const routine = [{pose:1,duration:1200},{pose:0,duration:2100},{pose:2,duration:2400},{pose:3,duration:2600},{pose:1,duration:1100},{pose:0,duration:2300}]
export default function CamilleIdle({active=true}) {
  const reduced=useReducedMotion()
  const [pose,setPose]=useState({current:reduced?0:1,previous:null})
  useEffect(()=>{
    if(!active || reduced)return
    let timer,settleTimer,step=0
    const next=()=>{
      const target=routine[step].pose
      setPose(old=>old.current===target?old:{current:target,previous:old.current})
      clearTimeout(settleTimer)
      settleTimer=setTimeout(()=>setPose(old=>({...old,previous:null})),260)
      timer=setTimeout(()=>{step=(step+1)%routine.length;next()},routine[step].duration)
    }
    next()
    return()=>{clearTimeout(timer);clearTimeout(settleTimer)}
  },[active,reduced])
  return <motion.div className="camille-idle" data-pose={poses[pose.current].name} role="img" aria-label="Camille smiles, waves and changes expression like an idle game character" animate={active&&!reduced ? {x:[0,3,1,-2,0],y:[0,-3,0,-1,0],rotate:[-.5,.7,0,-.8,-.5],scaleY:[1,.995,1,1.005,1]} : {x:0,y:0,rotate:0,scaleY:1}} transition={{duration:active&&!reduced?5.4:.45,repeat:active&&!reduced?Infinity:0,ease:'easeInOut'}}>
    {pose.previous!==null&&<img className="idle-previous-pose" src={poses[pose.previous].src} alt="" aria-hidden="true"/>}
    <motion.img key={poses[pose.current].name} src={poses[pose.current].src} alt="" aria-hidden="true" initial={{opacity:pose.previous===null?1:0}} animate={{opacity:1}} transition={{duration:reduced?0:.24,ease:'easeInOut'}}/>
  </motion.div>
}
