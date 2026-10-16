import { useEffect, useRef } from 'react'
import { motion, useAnimate } from 'motion/react'
import './DiscoveryPoster.css'
import { useSoundScope } from './audio/useSoundEffects'

export default function DiscoveryPoster({reduced,onImpact}) {
  const [scope,animate]=useAnimate()
  const sound=useSoundScope()
  const impact=useRef(onImpact)
  useEffect(()=>{impact.current=onImpact},[onImpact])
  useEffect(()=>{
    let cancelled=false,control
    const run=async()=>{
      try{await scope.current.querySelector('img').decode()}catch{/* Keep the copy usable if the image cannot decode. */}
      if(cancelled)return
      if(reduced){sound('paper',{volume:.6});impact.current?.();return}
      sound('whoosh',{volume:.55})
      control=animate('.discovery-poster',{opacity:1,y:0,scale:.98,rotate:-3.5},{duration:.28,ease:[.55,0,.95,.65]})
      await control
      if(cancelled)return
      sound('paper')
      impact.current?.()
      control=animate('.discovery-poster',{y:[0,4,0],scale:[.98,1.015,1],rotate:[-3.5,-2.6,-3]},{duration:.25,times:[0,.4,1],ease:'easeOut'})
      await control
    }
    run()
    return()=>{cancelled=true;control?.stop()}
  },[animate,reduced,scope,sound])
  return <motion.div ref={scope} className="discovery-poster-layer" initial={false} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
    <motion.figure className="discovery-poster" initial={reduced?false:{opacity:0,y:-140,scale:1.5,rotate:-9}} style={reduced?{rotate:-3}:undefined}>
      <img src="/installation-discovery-poster.png" width="941" height="1672" alt="A social-media post introducing the New Duolingo Installation: a Paris-inspired fashion pop-up with clothing stations, kiosks, Duo and merchandise"/>
    </motion.figure>
  </motion.div>
}
