import { motion, useReducedMotion } from 'motion/react'
import './InstallationOverview.css'

const stations = [
  {id:'kiosks',title:'Interactive Kiosks',description:'Receive French challenges',path:'M800 300V345L708 428',x:708,y:428},
  {id:'clothing',title:'Clothing Stations',description:'Find correct items.',path:'M233 363V424L268 496',x:268,y:496},
  {id:'duomart',title:'Duomart',description:'Duolingo merchandise & souvenirs',path:'M1394 170V211L1420 271',x:1420,y:271},
]

export default function InstallationOverview() {
  const reduced=useReducedMotion()
  return <div className="installation-overview">
    <motion.header className="installation-intro" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:reduced?0:.9,duration:.4}}>
      <h2 className="installation-heading">Inside the Installation</h2>
      <p>A physical French-learning experience built around fashion.</p>
    </motion.header>
    <svg className="installation-leaders" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
      {stations.map((station,index)=><motion.g key={station.id} initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:1.3+index*.5,duration:.2}}>
        <motion.path d={station.path} initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{delay:reduced?0:1.3+index*.5,duration:.3}}/>
        <motion.circle cx={station.x} cy={station.y} r="7" initial={reduced?false:{scale:0}} animate={{scale:1}} style={{transformOrigin:`${station.x}px ${station.y}px`}} transition={{delay:reduced?0:1.5+index*.5,duration:.3,type:'spring',bounce:.3}}/>
      </motion.g>)}
    </svg>
    {stations.map((station,index)=><motion.div key={station.id} className={`installation-callout installation-${station.id}`} initial={reduced?false:{opacity:0,y:10,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{delay:reduced?0:1.45+index*.5,duration:.35,type:'spring',bounce:.16}}>
      <h3>{station.title}</h3><p>{station.description}</p>
    </motion.div>)}
  </div>
}
