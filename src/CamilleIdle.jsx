import { useEffect, useId, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import RigMotion from './RigMotion'

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

function Arm({side,id,moving}) {
  const left=side==='left'
  const anchor=left?[450,600]:[615,600]
  const values=index=>routine.map(frame=>frame[side][index])
  return <g className={`camille-arm camille-arm-${side}`} transform={`translate(${anchor.join(' ')})`}>
    <RigMotion className="camille-upper-arm" values={values(0)} times={times} enabled={moving}>
      <path d="M-43 0C-43-26-27-39 0-39S43-26 43 0V180C43 207-43 207-43 180Z" fill={`url(#${id}-sleeve)`}/>
      <g transform="translate(0 180)">
        <RigMotion className="camille-lower-arm" values={values(1)} times={times} enabled={moving}>
          <path d="M-41 0C-41-24-26-39 0-39S41-24 41 0L39 143Q0 156-39 143Z" fill={`url(#${id}-sleeve)`}/>
          <path d="M-32 132Q0 142 32 132" fill="none" stroke="#ece5db" strokeWidth="3" opacity=".5"/>
          <g transform="translate(0 141)">
            <RigMotion className="camille-hand" values={values(2)} times={times} enabled={moving}>
              <path d="M-30-5Q-36-20-18-25H18Q32-24 32-8L34 14Q49 6 49 22Q48 45 30 58Q14 71-6 64Q-29 55-31 30Z" fill={`url(#${id}-hand)`}/>
            </RigMotion>
          </g>
        </RigMotion>
      </g>
    </RigMotion>
  </g>
}

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
        <linearGradient id={`${id}-sleeve`}><stop stopColor="#fffdf9"/><stop offset=".65" stopColor="#fffaf3"/><stop offset="1" stopColor="#f8f2e9"/></linearGradient>
        <linearGradient id={`${id}-hand`} x2=".8" y2="1"><stop stopColor="#fbd6aa"/><stop offset="1" stopColor="#f1c18f"/></linearGradient>
        <clipPath id={`${id}-eyes`}><ellipse cx="485" cy="328" rx="68" ry="65"/><ellipse cx="617" cy="344" rx="65" ry="58"/></clipPath>
      </defs>
      <RigMotion type="translate" className="camille-body-lift" values={routine.map(frame=>[0,frame.lift])} times={times} enabled={moving}>
        <g transform="translate(550 1455)">
          <RigMotion className="camille-body-lean" values={routine.map(frame=>frame.lean)} times={times} enabled={moving}>
            <g transform="translate(-550 -1455)">
              <image className="camille-stable-body" href="/camille-animation-body.png" width="1024" height="1536"/>
              <Arm side="left" id={id} moving={moving}/>
              <Arm side="right" id={id} moving={moving}/>
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
