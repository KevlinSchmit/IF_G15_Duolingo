import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './ScanResultGallery.css'
import { useSoundSequence } from './audio/useSoundEffects'

const cards=[
  {src:'/scan-results/01-success.png',alt:'Successful scan: Camille found the white T-shirt'},
  {src:'/scan-results/02-not-it.png',alt:'Incorrect scan: Camille can ask for a hint or try again'},
  {src:'/scan-results/03-retries.png',alt:'Retry options: add the outfit to the avatar or try another option'},
]
export default function ScanResultGallery() {
  const reduced=useReducedMotion()
  const [stage,setStage]=useState(reduced?4:0)
  useSoundSequence('result-cards',reduced?[{name:'pop',volume:.6}]:[0,.55,1.1].map((delay,index)=>({name:'pop',delay,volume:.6,pitch:1+index*.13})))
  useEffect(()=>{
    if(reduced)return
    const timers=[0,550,1100,1700].map((delay,index)=>setTimeout(()=>setStage(index+1),delay))
    return()=>timers.forEach(clearTimeout)
  },[reduced])
  const assembled=reduced||stage===4
  return <motion.div className="scan-result-gallery" role="group" aria-label="Three scan-result screens" data-stage={stage} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.15}}>
    {cards.map((card,index)=><motion.figure key={card.src} className="scan-result-card" data-order={index+1} data-visible={reduced||stage>index} style={{zIndex:index+1}} initial={reduced?false:{opacity:0,scale:.55,x:'-50%',y:'-20%',rotate:-8}} animate={{opacity:reduced||stage>index?1:0,scale:reduced||stage>index?1:.55,x:'-50%',y:'-50%',left:assembled?`${100/6+index*100/3}%`:`${47+index*3}%`,rotate:assembled?0:[-6,5,-2][index]}} transition={{duration:reduced?0:assembled?.48:.42,type:'spring',bounce:assembled?.17:.32}}><img src={card.src} alt={card.alt}/></motion.figure>)}
  </motion.div>
}
