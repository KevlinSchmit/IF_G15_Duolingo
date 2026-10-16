import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './KioskVideoPanel.css'
import ScanResultGallery from './ScanResultGallery'
import PanelNotes from './PanelNotes'
import ScanFeedbackDemo from './ScanFeedbackDemo'
import { useSoundSequence } from './audio/useSoundEffects'

const demos = {
  sharing:{title:'Save Your Outfit',src:'/videos/sharing-outfit.mp4',poster:'/videos/sharing-outfit-poster.webp',label:'Save Your Outfit demonstration, playing without sound',notes:[{icon:'share',text:'Save and share completed outfits'},{icon:'likes',text:'Earn likes from other participants'},{icon:'ranking',text:'Compete on the community leaderboard'}]},
  proficiency:{title:'Personalized Learning',src:'/videos/personalized-proficiency.mp4',poster:'/videos/personalized-proficiency-poster.webp',label:'Personalized Learning demonstration, playing without sound',notes:[{icon:'checkin',text:'Check-in at a kiosks'},{icon:'account',text:'Scan your Duolingo account'},{icon:'challenge',text:'Receive challenges based on French proficiency'}]},
  clothing:{title:'Receive a Prompt',src:'/videos/nfc-phone-prompt.mp4',poster:'/videos/nfc-phone-prompt-poster.webp',label:'A handheld phone displaying Camille’s French clothing challenge and NFC Scan your item prompt, playing without sound',loop:true,notes:[{icon:'listen',text:'Read or listen to a French clothing prompt'},{icon:'find',text:'Find the matching item in the installation'},{icon:'interact',text:'Practice vocabulary through physical interaction'}]},
  scan:{title:'Scan and Receive Feedback',notes:[{icon:'scan',text:'Scan the selected clothing item'},{icon:'progress',text:'Earn progress and dress your avatar, receive hints or retries'}]},
}

export default function KioskVideoPanel({demo='proficiency',showGallery=false,showLeaderboard=false,galleryReplay=0}) {
  const content=demos[demo]
  const reduced=useReducedMotion()
  const titleId=useId()
  const videoRef=useRef(null)
  const [ready,setReady]=useState(false)
  const [needsPlay,setNeedsPlay]=useState(false)
  const [leaderboardAspect,setLeaderboardAspect]=useState(3/2)
  const landscapeLeaderboard=leaderboardAspect>1
  // One shared entrance motif for numbered steps 1–4; continuations keep it quiet.
  useSoundSequence(demo,[{name:'step',delay:.2,volume:.8}])
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
  },[ready,showGallery,demo])
  const videoContent=<>
    {ready ? <video key={`${demo}-${demo==='sharing'?galleryReplay:'clip'}`} ref={videoRef} src={content.src} poster={content.poster} autoPlay muted playsInline loop={content.loop??true} preload="auto" aria-label={content.label} onLoadedData={playVideo} onPlay={()=>setNeedsPlay(false)} onVolumeChange={event=>{event.currentTarget.muted=true}}/> : <img src={content.poster} alt=""/>}
    {needsPlay&&<button className="video-play-button" onClick={playVideo}>Play video <span aria-hidden="true">▶</span></button>}
  </>
  return <motion.aside className={`kiosk-video-panel ${demo==='sharing'?'sharing-outfit-panel':''} ${showLeaderboard?'leaderboard-panel':''} ${showLeaderboard&&landscapeLeaderboard?'landscape-leaderboard-panel':''} ${demo==='scan'&&!showGallery?'has-nfc-sticker scan-feedback-panel':''}`} style={{'--leaderboard-aspect':leaderboardAspect,'--leaderboard-frame-aspect':landscapeLeaderboard?leaderboardAspect:1}} aria-labelledby={titleId} initial={reduced?{opacity:0,y:'-50%'}:{opacity:0,x:45,y:'-50%',scale:.94}} animate={{opacity:1,x:0,y:'-50%',scale:1}} transition={{duration:reduced?.1:.38,type:'spring',bounce:.15}} exit={{opacity:0,x:15}} onAnimationComplete={()=>setReady(true)}>
    <AnimatePresence>
      {demo==='scan'&&!showGallery&&<motion.div className="nfc-sticker-group" key="nfc-phone" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}>
        <span className="nfc-sticker-label">NFC tag<svg viewBox="0 0 45 25" fill="none" aria-hidden="true"><path d="M3 7C14 2 25 3 37 17M28 16l10 2-2-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        <motion.figure className="nfc-phone-sticker" initial={reduced?false:{opacity:0,scale:.7,rotate:0,y:12}} animate={{opacity:1,scale:1,rotate:10,y:0}} transition={{delay:reduced?0:.18,duration:reduced?0:.45,type:'spring',bounce:.28}}>
          <img src="/nfc-phone-sticker.png" alt="Phone showing a 5:00 timer and a prompt to tap the NFC tag on clothes"/>
        </motion.figure>
      </motion.div>}
    </AnimatePresence>
    <div className="kiosk-panel-heading"><span className="kiosk-step-number" aria-hidden="true">{{proficiency:1,clothing:2,scan:3,sharing:4}[demo]}</span><h2 id={titleId}>{content.title}</h2></div>
    <div className={`proficiency-video-frame ${demo==='sharing'?'sharing-outfit-frame':''}`}>
      <AnimatePresence mode="wait" initial={false}>
        {showGallery ? <ScanResultGallery key={`gallery-${galleryReplay}`}/> : showLeaderboard ? <motion.div key="leaderboard" className="sharing-leaderboard" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.32,ease:[.22,.7,.2,1]}}>
          <figure className="sharing-leaderboard-card" data-layout={landscapeLeaderboard?'landscape':'portrait'}><img src="/sharing-fashion-challenge-landscape.png" alt="Paris Fashion Challenge desktop leaderboard: Emma’s Duo outfit in first place, Chloé second and Camille third, with challenge details and recent looks" onLoad={event=>{const image=event.currentTarget;if(image.naturalWidth&&image.naturalHeight)setLeaderboardAspect(image.naturalWidth/image.naturalHeight)}}/><span className="winner-outfit-origin" aria-hidden="true"/></figure>
        </motion.div> : demo==='scan' ? <ScanFeedbackDemo key="scan-feedback" active={ready}/> : <motion.div key={`video-${demo}`} className="scan-video-content" initial={{opacity:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}} transition={{duration:reduced?0:.22}}>
          {demo==='sharing' ? <div className="sharing-outfit-media">
            <div className="sharing-video-card">{videoContent}</div>
            {[{src:'/save-outfit/translation-red-outfit.png',alt:'Camille wearing a red coat, black beret and blue jeans in a French translation exercise: C’est bien !'},{src:'/save-outfit/learning-path-red-outfit.png',alt:'Camille wearing a red coat, black beret and blue jeans on the Duolingo learning path in Section 4, Unit 32: Talk about the future',dark:true}].map((image,index)=><motion.figure key={image.src} className={`sharing-image-card ${image.dark?'sharing-image-dark':''}`} initial={reduced?false:{opacity:0,y:18,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={{delay:reduced?0:.12+index*.1,duration:.4,type:'spring',bounce:.2}}><img src={image.src} alt={image.alt}/></motion.figure>)}
          </div> : videoContent}
        </motion.div>}
      </AnimatePresence>
    </div>
    <PanelNotes items={content.notes}/>
  </motion.aside>
}
