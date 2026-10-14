import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './KioskVideoPanel.css'
import ScanResultGallery from './ScanResultGallery'

const demos = {
  sharing:{title:'4. Sharing Outfit',src:'/videos/sharing-outfit.mp4',poster:'/videos/sharing-outfit-poster.webp',label:'Sharing Outfit demonstration, playing without sound'},
  proficiency:{title:'1. Personalized proficiency',src:'/videos/personalized-proficiency.mp4',poster:'/videos/personalized-proficiency-poster.webp',label:'Personalized proficiency demonstration, playing without sound'},
  clothing:{title:'2. Find Clothing',src:'/videos/find-clothing.mp4',poster:'/videos/find-clothing-poster.webp',label:'Find Clothing demonstration, playing without sound'},
  scan:{title:'3. Scan the Cloth',src:'/videos/scan-the-cloth.mp4',poster:'/videos/scan-the-cloth-poster.webp',label:'Scan the Cloth demonstration, playing without sound',loop:false},
}

export default function KioskVideoPanel({demo='proficiency',showGallery=false,galleryReplay=0}) {
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
    if(showGallery){videoRef.current?.pause();return}
    if(!ready)return
    const video=videoRef.current
    if(!video)return
    video.muted=true
    video.defaultMuted=true
    video.play().catch(()=>setNeedsPlay(true))
  },[ready,showGallery])
  const videoContent=<>
    {ready ? <video key={demo==='sharing'?galleryReplay:'clip'} ref={videoRef} src={content.src} poster={content.poster} autoPlay muted playsInline loop={content.loop??true} preload="auto" aria-label={content.label} onLoadedData={playVideo} onPlay={()=>setNeedsPlay(false)} onVolumeChange={event=>{event.currentTarget.muted=true}}/> : <img src={content.poster} alt=""/>}
    {needsPlay&&<button className="video-play-button" onClick={playVideo}>Play video <span aria-hidden="true">▶</span></button>}
  </>
  return <motion.aside className={`kiosk-video-panel ${demo==='sharing'?'sharing-outfit-panel':''}`} aria-labelledby={titleId} initial={reduced?{opacity:0,y:'-50%'}:{opacity:0,x:45,y:'-50%',scale:.94}} animate={{opacity:1,x:0,y:'-50%',scale:1}} transition={{duration:reduced?.1:.38,type:'spring',bounce:.15}} exit={{opacity:0,x:15}} onAnimationComplete={()=>setReady(true)}>
    <AnimatePresence>
      {demo==='scan'&&!showGallery&&<motion.div className="nfc-sticker-group" key="nfc-phone" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}>
        <span className="nfc-sticker-label">NFC tag<svg viewBox="0 0 45 25" fill="none" aria-hidden="true"><path d="M3 7C14 2 25 3 37 17M28 16l10 2-2-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <motion.figure className="nfc-phone-sticker" initial={reduced?false:{opacity:0,scale:.7,rotate:0,y:12}} animate={{opacity:1,scale:1,rotate:10,y:0}} transition={{delay:reduced?0:.18,duration:reduced?0:.45,type:'spring',bounce:.28}}>
          <img src="/nfc-phone-sticker.png" alt="Phone showing a 5:00 timer and a prompt to tap the NFC tag on clothes"/>
        </motion.figure>
      </motion.div>}
    </AnimatePresence>
    <h2 id={titleId}>{content.title}</h2>
    <div className={`proficiency-video-frame ${demo==='sharing'?'sharing-outfit-frame':''}`}>
      <AnimatePresence mode="wait" initial={false}>
        {showGallery ? <ScanResultGallery key={`gallery-${galleryReplay}`}/> : <motion.div key="video" className="scan-video-content" initial={{opacity:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}} transition={{duration:reduced?0:.22}}>
          {demo==='sharing' ? <div className="sharing-outfit-media">
            <div className="sharing-video-card">{videoContent}</div>
            <motion.figure className="sharing-image-card" initial={reduced?false:{opacity:0,y:18,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={{delay:reduced?0:.15,duration:.4,type:'spring',bounce:.2}}><img src="/sharing-fashion-challenge.png" alt="Paris Fashion Challenge leaderboard showing Chloé, Camille, Emma and the community’s outfits"/></motion.figure>
          </div> : videoContent}
        </motion.div>}
      </AnimatePresence>
    </div>
  </motion.aside>
}
