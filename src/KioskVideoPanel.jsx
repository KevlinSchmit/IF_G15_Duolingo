import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './KioskVideoPanel.css'

const demos = {
  proficiency:{title:'1. Personalized proficiency',src:'/videos/personalized-proficiency.mp4',poster:'/videos/personalized-proficiency-poster.webp',label:'Personalized proficiency demonstration, playing without sound'},
  clothing:{title:'2. Find Clothing',src:'/videos/find-clothing.mp4',poster:'/videos/find-clothing-poster.webp',label:'Find Clothing demonstration, playing without sound'},
  scan:{title:'3. Scan the Cloth',src:'/videos/scan-the-cloth.mp4',poster:'/videos/scan-the-cloth-poster.webp',label:'Scan the Cloth demonstration, playing without sound',loop:false},
}

export default function KioskVideoPanel({demo='proficiency'}) {
  const content=demos[demo]
  const reduced=useReducedMotion()
  const titleId=useId()
  const videoRef=useRef(null)
  const [ready,setReady]=useState(false)
  const [needsPlay,setNeedsPlay]=useState(false)
  const playVideo=()=>{
    const video=videoRef.current
    if(!video)return
    video.muted=true
    video.play().then(()=>setNeedsPlay(false)).catch(()=>setNeedsPlay(true))
  }
  useEffect(()=>{
    if(!ready)return
    const video=videoRef.current
    video.muted=true
    video.defaultMuted=true
    video.play().catch(()=>setNeedsPlay(true))
  },[ready])
  return <motion.aside className="kiosk-video-panel" aria-labelledby={titleId} initial={reduced?{opacity:0,y:'-50%'}:{opacity:0,x:45,y:'-50%',scale:.94}} animate={{opacity:1,x:0,y:'-50%',scale:1}} transition={{duration:reduced?.1:.38,type:'spring',bounce:.15}} exit={{opacity:0,x:15}} onAnimationComplete={()=>setReady(true)}>
    <h2 id={titleId}>{content.title}</h2>
    <div className="proficiency-video-frame">
      {ready ? <video ref={videoRef} src={content.src} poster={content.poster} autoPlay muted playsInline loop={content.loop??true} preload="auto" aria-label={content.label} onPlay={()=>setNeedsPlay(false)} onVolumeChange={event=>{event.currentTarget.muted=true}}/> : <img src={content.poster} alt=""/>}
      {needsPlay&&<button className="video-play-button" onClick={playVideo}>Play video <span aria-hidden="true">▶</span></button>}
    </div>
  </motion.aside>
}
