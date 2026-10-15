import { useEffect, useId, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const expressions=[{name:'neutral',duration:3600},{name:'relaxed',duration:2400},{name:'wink',duration:650},{name:'neutral',duration:3900},{name:'wink',duration:600}]
const forearm='M128 625Q108 559 153 526Q190 503 223 531Q246 552 273 594L340 710 361 748 323 790Q280 805 244 764L164 650Z'
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
  return <motion.div className="camille-idle" data-pose={face} role="img" aria-label="Camille gently shifts her weight, waves, looks around and winks" animate={moving?{x:[0,1.5,-1.5,0],y:[0,-1.5,0,0],rotate:[0,.65,-.65,0],scaleY:[1,1.003,.998,1]}:{x:0,y:0,rotate:0,scaleY:1}} transition={{duration:moving?6.8:.6,repeat:moving?Infinity:0,ease:[.45,0,.55,1]}}>
    <svg className="camille-puppet" viewBox="0 0 1024 1490" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-forearm`}><path d={forearm}/></clipPath>
        <clipPath id={`${id}-elbow`}><ellipse cx="331" cy="743" rx="31" ry="30"/></clipPath>
        <clipPath id={`${id}-eyes`}><ellipse cx="485" cy="328" rx="68" ry="65"/><ellipse cx="617" cy="344" rx="65" ry="58"/></clipPath>
        <mask id={`${id}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1536"><rect width="1024" height="1536" fill="white"/><path d={forearm} fill="black"/></mask>
      </defs>
      <image className="camille-arm-backdrop" href="/camille-idle-relaxed.png" width="1024" height="1536" clipPath={`url(#${id}-forearm)`}/>
      <image className="camille-stable-body" href="/camille-cartoon.png" width="1024" height="1536" mask={`url(#${id}-body)`}/>
      <g className="camille-forearm">
        {moving&&<animateTransform attributeName="transform" type="rotate" values="0 316 735;0 316 735;3.5 316 735;-3 316 735;2.5 316 735;0 316 735;0 316 735" keyTimes="0;.3;.44;.58;.72;.84;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1" dur="6.4s" repeatCount="indefinite"/>}
        <image href="/camille-cartoon.png" width="1024" height="1536" clipPath={`url(#${id}-forearm)`}/>
      </g>
      <image href="/camille-cartoon.png" width="1024" height="1536" clipPath={`url(#${id}-elbow)`}/>
      <g clipPath={`url(#${id}-eyes)`}>
        <motion.image className="camille-expression" data-expression="relaxed" href="/camille-idle-relaxed.png" width="1024" height="1536" initial={false} animate={{opacity:face==='relaxed'?1:0}} transition={{duration:reduced?0:.18,ease:'easeInOut'}}/>
        <motion.image className="camille-expression" data-expression="wink" href="/camille-idle-wink.png" width="1024" height="1536" initial={false} animate={{opacity:face==='wink'?1:0}} transition={{duration:reduced?0:.12,ease:'easeInOut'}}/>
      </g>
    </svg>
  </motion.div>
}
