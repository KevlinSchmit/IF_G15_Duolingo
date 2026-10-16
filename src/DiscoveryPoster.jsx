import { motion } from 'motion/react'
import './DiscoveryPoster.css'

export default function DiscoveryPoster({reduced}) {
  return <motion.div className="discovery-poster-layer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
    <motion.figure className="discovery-poster" initial={reduced?false:{y:45,scale:.92,rotate:-7}} animate={{y:0,scale:1,rotate:-3}} transition={{duration:reduced?0:.55,type:'spring',bounce:.16}}>
      <img src="/installation-discovery-poster.png" alt="A social-media post introducing the New Duolingo Installation: a Paris-inspired fashion pop-up with clothing stations, kiosks, Duo and merchandise"/>
    </motion.figure>
  </motion.div>
}
