import { motion, useReducedMotion } from 'motion/react'
import './InstallationTour.css'
import { useSoundSequence } from './audio/useSoundEffects'

const details={
  kiosks:{title:'Check-in & Check-out Kiosks',description:'Activate and complete your visit',photo:'/installation-kiosk-photo.png',photoAlt:'Two physical Duolingo kiosks, numbered 01 and 02, showing Duo and Check in and Check out buttons inside the French fashion installation'},
  clothing:{title:'Clothing Stations',description:'Find correct items',photo:'/installation-clothing-photo.png',photoAlt:'The French fashion installation clothing station, with cream shelves of hats, scarves and shoes beside rails of striped shirts, red jackets, navy coats and tote bags'},
  duomart:{title:'Duomart',description:'Duolingo merchandise & souvenirs',photo:'/installation-duomart-photo.png',photoAlt:'The Duomart souvenir display with French Duo plush toys, tote bags, berets, caps, scarves, mugs, postcards, stickers and keyrings'},
}

export default function InstallationTour({step}) {
  const reduced=useReducedMotion()
  const content=details[step]
  useSoundSequence(step,[{name:'whoosh',volume:.35},{name:'pop',delay:reduced?0:.65,volume:.65}],!!content)
  if(!content)return null
  return <motion.div className={`installation-tour installation-tour-${step}`} aria-label={`${content.title} close-up`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
    <motion.div className="installation-tour-caption" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:reduced?0:.35,duration:reduced?0:.35}}>
      <h2>{content.title}</h2><p>{content.description}</p>
    </motion.div>
    {content.photo&&<motion.figure className="installation-tour-photo" initial={reduced?false:{opacity:0,scale:.85,y:25,rotate:3}} animate={{opacity:1,scale:1,y:0,rotate:0}} transition={{delay:reduced?0:.65,duration:reduced?0:.48,type:'spring',bounce:.18}}>
      <img src={content.photo} alt={content.photoAlt}/>
    </motion.figure>}
  </motion.div>
}
