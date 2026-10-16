import { motion, useReducedMotion } from 'motion/react'
import './InstallationTour.css'

const details={
  kiosks:{title:'Check-in & Check-out Kiosks',description:'Activate and complete your visit'},
  clothing:{title:'Clothing Stations',description:'Find correct items'},
  duomart:{title:'Duomart',description:'Duolingo merchandise & souvenirs'},
}

export default function InstallationTour({step}) {
  const reduced=useReducedMotion()
  const content=details[step]
  if(!content)return null
  return <motion.div className={`installation-tour installation-tour-${step}`} aria-label={`${content.title} close-up`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
    <motion.div className="installation-tour-caption" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:reduced?0:.35,duration:reduced?0:.35}}>
      <h2>{content.title}</h2><p>{content.description}</p>
    </motion.div>
    {step==='kiosks'&&<motion.figure className="installation-tour-photo" initial={reduced?false:{opacity:0,scale:.85,y:25,rotate:3}} animate={{opacity:1,scale:1,y:0,rotate:0}} transition={{delay:reduced?0:.65,duration:reduced?0:.48,type:'spring',bounce:.18}}>
      <svg viewBox="420 325 570 405" role="img" aria-label="Close-up of the three illustrated kiosks from the installation overview: machines 01, 02 and 03">
        <image href="/paris-adventure-sky.png" width="1600" height="900" preserveAspectRatio="none"/>
      </svg>
    </motion.figure>}
  </motion.div>
}
