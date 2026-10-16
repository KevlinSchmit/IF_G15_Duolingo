import { useEffect } from 'react'
import { motion } from 'motion/react'
import FrenchDuo from './FrenchDuo'
import './SceneTransition.css'
import { useSoundScope } from './audio/useSoundEffects'

export default function SceneTransition({ origin, onComplete }) {
  const sound=useSoundScope(true)
  useEffect(()=>{
    const timer=setTimeout(()=>sound('whoosh',{volume:.65}),150)
    return()=>clearTimeout(timer)
  },[sound])
  return <div className="scene-transition" aria-hidden="true">
    <motion.div className="transition-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height}} initial={{x:0}} animate={{x:[0,0,innerWidth-origin.left+origin.width]}} transition={{duration:1.05,times:[0,.15,1],ease:'easeIn'}} onAnimationComplete={onComplete}>
      <motion.div className="duo-turn-front" initial={{opacity:1,rotateY:0}} animate={{opacity:0,rotateY:65}} transition={{duration:.18}}><FrenchDuo/></motion.div>
      <motion.div className="duo-turn-side" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15,delay:.09}}><img className="duo-side-art" src="/french-duo-side.png" alt=""/></motion.div>
    </motion.div>
  </div>
}
