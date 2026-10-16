import { motion, useReducedMotion } from 'motion/react'
import { useSoundSequence } from './audio/useSoundEffects'
import './ThankYouSlide.css'

export default function ThankYouSlide() {
  const reduced=useReducedMotion()
  useSoundSequence('thank-you',[{name:'success',delay:.2,volume:.55}])
  return <motion.section className="thank-you-scene" aria-label="Thank you — Merci!" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.3}}>
    <motion.h1 className="thank-you-title" initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.45}}>Thank you</motion.h1>
    <motion.div className="thank-you-artwork" initial={reduced?false:{opacity:0,y:16,scale:.94}} animate={{opacity:1,y:0,scale:1}} transition={{duration:reduced?0:.6,delay:reduced?0:.12,ease:[.22,1,.36,1]}}>
      <motion.img src="/thank-you-duo.webp" alt="A smiling Duo raising his wings with a flowing blue, white and red French scarf" draggable="false" animate={reduced?{}:{y:[0,-5,0]}} transition={{duration:3.8,repeat:Infinity,ease:'easeInOut'}}/>
    </motion.div>
    <motion.p className="thank-you-merci" lang="fr" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.4,delay:reduced?0:.35}}>Merci!</motion.p>
  </motion.section>
}
