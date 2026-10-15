import { useEffect, useId, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import RigMotion from './RigMotion'
import CamilleArm from './CamilleArm'

// Wave → lower hands → hands on hips → present → shrug → return to the wave.
const routine=[
  {time:0, left:[50,100,0],right:[-15,0,0],lean:0,lift:0},
  {time:.06,left:[42,112,-8],right:[-14,0,0],lean:-2,lift:0},
  {time:.12,left:[50,82,8],right:[-12,5,0],lean:1.5,lift:-3},
  {time:.18,left:[43,112,-8],right:[-14,0,0],lean:-1,lift:0},
  {time:.24,left:[50,90,0],right:[-15,0,0],lean:0,lift:0},
  {time:.32,left:[18,5,0],right:[-12,5,0],lean:1,lift:0},
  {time:.40,left:[65,-120,-10],right:[-65,120,10],lean:-2,lift:0},
  {time:.48,left:[65,-120,-10],right:[-65,120,10],lean:2.5,lift:0},
  {time:.55,left:[65,-120,-10],right:[-65,120,10],lean:-1.5,lift:0},
  {time:.63,left:[60,-25,-30],right:[-30,-20,25],lean:0,lift:-3},
  {time:.70,left:[55,95,-25],right:[-55,-95,25],lean:-2,lift:-12},
  {time:.77,left:[55,95,-25],right:[-55,-95,25],lean:2,lift:-8},
  {time:.84,left:[20,0,0],right:[-20,0,0],lean:0,lift:0},
  {time:.92,left:[50,100,0],right:[-15,0,0],lean:-1,lift:0},
  {time:1,left:[50,100,0],right:[-15,0,0],lean:0,lift:0},
]
const times=routine.map(frame=>frame.time)
const expressions=[{name:'neutral',duration:1600},{name:'wink',duration:650},{name:'neutral',duration:3800},{name:'relaxed',duration:2700},{name:'neutral',duration:3600},{name:'wink',duration:650},{name:'neutral',duration:1000}]

export default function CamilleIdle({active=true}) {
  const reduced=useReducedMotion()
  const id=useId().replaceAll(':','')
  const [expression,setExpression]=useState('neutral')
  useEffect(()=>{
    if(!active||reduced)return
    let timer,step=0
    const next=()=>{
      setExpression(expressions[step].name)
      timer=setTimeout(()=>{step=(step+1)%expressions.length;next()},expressions[step].duration)
    }
    next()
    return()=>clearTimeout(timer)
  },[active,reduced])
  const moving=active&&!reduced
  const face=moving?expression:'neutral'
  return <div className="camille-idle" data-pose={face} role="img" aria-label="Camille waves, rests her hands on her hips, presents the installation and shrugs">
    <svg className="camille-puppet" viewBox="0 0 1024 1490" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sleeve`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fffdfa"/><stop offset=".7" stopColor="#fffaf5"/><stop offset="1" stopColor="#faf5ed"/></linearGradient>
        <linearGradient id={`${id}-hand`} x2=".8" y2="1"><stop stopColor="#fbd6aa"/><stop offset="1" stopColor="#f1c18f"/></linearGradient>
        <clipPath id={`${id}-eyes`}><ellipse cx="485" cy="328" rx="68" ry="65"/><ellipse cx="617" cy="344" rx="65" ry="58"/></clipPath>
      </defs>
      <RigMotion type="translate" className="camille-body-lift" values={routine.map(frame=>[0,frame.lift])} times={times} enabled={moving}>
        <g transform="translate(550 1455)">
          <RigMotion className="camille-body-lean" values={routine.map(frame=>frame.lean)} times={times} enabled={moving}>
            <g transform="translate(-550 -1455)">
              <image className="camille-stable-body" href="/camille-animation-body.png" width="1024" height="1536"/>
              <CamilleArm side="left" id={id} moving={moving} routine={routine}/>
              <CamilleArm side="right" id={id} moving={moving} routine={routine}/>
              <g clipPath={`url(#${id}-eyes)`}>
                <image className="camille-expression" data-expression="relaxed" href="/camille-idle-relaxed.png" width="1024" height="1536" style={{opacity:face==='relaxed'?1:0,transition:reduced?'none':'opacity .18s ease-in-out'}}/>
                <image className="camille-expression" data-expression="wink" href="/camille-idle-wink.png" width="1024" height="1536" style={{opacity:face==='wink'?1:0,transition:reduced?'none':'opacity .12s ease-in-out'}}/>
              </g>
            </g>
          </RigMotion>
        </g>
      </RigMotion>
    </svg>
  </div>
}
