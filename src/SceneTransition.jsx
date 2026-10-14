import { motion } from 'motion/react'
import FrenchDuo from './FrenchDuo'
import './SceneTransition.css'

export default function SceneTransition({ origin, onComplete }) {
  return <div className="scene-transition" aria-hidden="true">
    <motion.div className="transition-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height}} initial={{x:0}} animate={{x:[0,0,innerWidth-origin.left+origin.width]}} transition={{duration:.72,times:[0,.15,1],ease:'easeIn'}} onAnimationComplete={onComplete}>
      <motion.div className="duo-turn-front" initial={{opacity:1,rotateY:0}} animate={{opacity:0,rotateY:65}} transition={{duration:.12}}><FrenchDuo/></motion.div>
      <motion.div className="duo-turn-side" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.1,delay:.06}}><img className="duo-side-art" src="/french-duo-side.png" alt=""/></motion.div>
    </motion.div>
  </div>
}
