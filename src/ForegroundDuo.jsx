import { useId } from 'react'
import { motion } from 'motion/react'

export default function ForegroundDuo({reduced}) {
  const id=useId().replaceAll(':','')
  return <motion.svg className="foreground-duo-rig" x="30" y="570" width="325" height="280" viewBox="180 100 860 850" overflow="visible" initial={reduced?false:{opacity:0,y:25,scale:.92}} animate={{opacity:1,y:0,scale:1}} style={{transformOrigin:'180px 855px'}} transition={{delay:reduced?0:.47,duration:reduced?0:.3}}>
    <defs><clipPath id={`${id}-body`}><rect x="300" y="0" width="724" height="1024"/></clipPath><clipPath id={`${id}-arm`}><rect x="0" y="390" width="280" height="345"/></clipPath></defs>
    <motion.g className="left-duo-wave" style={{transformOrigin:'384px 688px'}} animate={reduced?{rotate:0}:{rotate:[0,0,12,-5,12,0,0]}} transition={{delay:1.1,duration:4.6,repeat:reduced?0:Infinity,times:[0,.45,.55,.65,.75,.83,1],ease:'easeInOut'}}><g transform="translate(128 5)"><image href="/foreground-duo-rig.png" width="1024" height="1024" clipPath={`url(#${id}-arm)`}/></g></motion.g>
    <image href="/foreground-duo-rig.png" width="1024" height="1024" clipPath={`url(#${id}-body)`}/>
  </motion.svg>
}
