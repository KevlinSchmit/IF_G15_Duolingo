import { motion, useReducedMotion } from 'motion/react'
import './InstallationOverview.css'

const stations = [
  {id:'kiosks',title:'Check-in & Check-out Kiosks',description:'Activate and complete your visit',path:'M800 300V330Q800 345 790 355L708 428',x:708,y:428},
  {id:'clothing',title:'Clothing Stations',description:'Find correct items',path:'M233 363V411Q233 424 241 441L268 496',x:268,y:496},
  {id:'duomart',title:'Duomart',description:'Duolingo merchandise & souvenirs',path:'M1394 170V199Q1394 211 1399 222L1420 271',x:1420,y:271},
]

export default function InstallationOverview() {
  const reduced=useReducedMotion()
  return <div className="installation-overview">
    <motion.header className="installation-intro" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:reduced?0:.9,duration:.4}}>
      <h2 className="installation-heading">Inside the Installation</h2>
      <p>A physical French-learning experience built around fashion.</p>
    </motion.header>
    <svg className="installation-leaders" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
      {stations.map((station,index)=><motion.g key={station.id} initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:1.2+index*.6,duration:.3}}>
        {['halo','stroke'].map(layer=><motion.path key={layer} className={`installation-leader-${layer}`} d={station.path} vectorEffect="non-scaling-stroke" initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{delay:reduced?0:1.2+index*.6,duration:reduced?0:.65,ease:[.22,1,.36,1]}}/>)}
        <motion.circle cx={station.x} cy={station.y} r="8" initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:1.7+index*.6,duration:reduced?0:.25}}/>
      </motion.g>)}
    </svg>
    {stations.map((station,index)=><motion.div key={station.id} className={`installation-callout installation-${station.id}`} initial={reduced?false:{opacity:0,y:8,scale:.985}} animate={{opacity:1,y:0,scale:1}} transition={{delay:reduced?0:1.32+index*.6,duration:reduced?0:.55,ease:[.22,1,.36,1]}}>
      <h3>{station.title}</h3><p>{station.description}</p>
    </motion.div>)}
  </div>
}
