import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './AdventureScene.css'

const regions = [
  {name:'fashion-booth', points:'0,165 480,165 480,785 0,900',origin:'240px 800px',delay:.14},
  {name:'kiosk-one', points:'480,355 680,355 680,765 480,765',origin:'580px 765px',delay:.3},
  {name:'kiosk-two', points:'680,355 865,355 865,765 680,765',origin:'770px 765px',delay:.4},
  {name:'kiosk-three', points:'865,355 1050,355 1050,765 865,765',origin:'950px 765px',delay:.5},
  {name:'duomart', points:'1060,180 1600,180 1600,900 1050,765 1050,380',origin:'1320px 800px',delay:.25},
]
export default function AdventureScene({ hideCharacter = false }) {
  const reduced = useReducedMotion()
  const id = useId().replaceAll(':','')
  return <section className="adventure-scene" aria-label="Camille’s Paris fashion adventure">
    <div className="adventure-stage">
      <svg className="adventure-panorama" viewBox="0 0 1600 900" role="img" aria-label="Paris fashion pop-up with an Eiffel Tower, clothing booth, three learning kiosks and Duomart">
        <defs>
          <mask id={`${id}-scenery-mask`}><rect width="1600" height="900" fill="white"/>{regions.map(region=><polygon key={region.name} points={region.points} fill="black"/>)}</mask>
          {regions.map(region=><clipPath key={region.name} id={`${id}-${region.name}`}><polygon points={region.points}/></clipPath>)}
        </defs>
        <motion.image href="/paris-adventure.png" width="1600" height="900" preserveAspectRatio="none" mask={`url(#${id}-scenery-mask)`} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:reduced ? 0 : .35}}/>
        {regions.map(region=><motion.g className="adventure-piece" data-part={region.name} key={region.name} style={{transformOrigin:region.origin}} initial={reduced ? false : {opacity:0,scale:.8,y:65}} animate={{opacity:1,scale:1,y:0}} transition={{delay:reduced ? 0 : region.delay,duration:reduced ? 0 : .6,type:'spring',bounce:.22}}><image href="/paris-adventure.png" width="1600" height="900" preserveAspectRatio="none" clipPath={`url(#${id}-${region.name})`}/></motion.g>)}
        <motion.image href="/paris-adventure.png" width="1600" height="900" preserveAspectRatio="none" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : 1.1,duration:reduced ? 0 : .15}}/>
      </svg>
      <div className={`adventure-character ${hideCharacter ? 'character-in-flight' : ''}`}><div className="character-ground-shadow"/><motion.img src="/camille-cartoon.png" alt="Camille as a Duolingo-style character, wearing a white blouse and dark skirt" animate={reduced || hideCharacter ? {} : {y:[0,-3,0]}} transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}/></div>
    </div>
  </section>
}
