import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './ScanFeedbackDemo.css'
import { useSoundSequence } from './audio/useSoundEffects'

const shirtOutline='M558 297 Q606 320 655 286 L713 298 Q742 305 770 339 L851 446 Q863 467 841 484 L791 516 L774 487 L778 720 H390 L408 550 L366 529 Q352 519 365 494 L423 379 Q442 349 477 330 Z'
// Shared coordinates keep the flying garment aligned with the avatar's shirt.
const garmentPath='M487 528 Q529 580 570 528 C620 522 702 566 749 595 L684 699 L657 684 L695 856 Q546 882 425 878 Q438 852 424 827 L416 813 L428 684 L375 723 L303 627 Q420 529 487 528Z'
const garmentBox='300 520 450 365'

function Shirt({className}) {
  const id=useId()
  return <svg className={className} viewBox={garmentBox} preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id={id}><path d={garmentPath}/></clipPath></defs><image href="/camille-scan-success.png" width="1024" height="1536" clipPath={`url(#${id})`}/></svg>
}

function FeedbackAvatar({equipped,reduced}) {
  return <motion.div className={`scan-feedback-avatar ${equipped?'is-equipped':''}`} animate={equipped&&!reduced?{y:[0,-15,0,-5,0],rotate:[0,-3,2,0]}:{y:0,rotate:0}} transition={{duration:1.1,ease:'easeInOut'}}>
    <svg viewBox="0 0 1024 1536" role="img" aria-label={equipped?'Camille happily wearing the white T-shirt':'Camille waiting for her new white T-shirt'}>
      <defs><mask id="scan-avatar-without-shirt"><rect width="1024" height="1536" fill="white"/><path d={garmentPath} fill="black"/></mask><clipPath id="scan-avatar-shirt"><path d={garmentPath}/></clipPath></defs>
      <path d={garmentPath} fill="#edf1f3" stroke="#c6d3db" strokeWidth="10" strokeDasharray="20 16" strokeLinejoin="round"/>
      <image href="/camille-scan-success.png" width="1024" height="1536" mask="url(#scan-avatar-without-shirt)"/>
      <motion.path d="M490 378Q506 432 562 396" fill="none" stroke="#ed7957" strokeWidth="14" strokeLinecap="round" initial={{opacity:0}} animate={{opacity:equipped?1:0}} transition={{duration:.2}}/>
      <motion.image className="scan-equipped-shirt" href="/camille-scan-success.png" width="1024" height="1536" clipPath="url(#scan-avatar-shirt)" initial={{opacity:0}} animate={{opacity:equipped?1:0}} transition={{duration:reduced?0:.15}}/>
      <rect className="scan-avatar-shirt-target" x="300" y="520" width="450" height="365" fill="transparent"/>
    </svg>
  </motion.div>
}

function ScanFeedbackScreen({phase,reduced}) {
  const equipped=phase==='success'
  return <div className="scan-feedback-screen" aria-label="Camille's clothing challenge">
    <div className="scan-game-status">
      <span className="scan-game-home" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8v2h-3v8h-5v-6h-2v6H6v-8H3Z" fill="currentColor"/></svg></span>
      <span className="scan-game-progress" role="progressbar" aria-label="Clothing challenge progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={equipped?28:10}><motion.span initial={false} animate={{width:equipped?'28%':'10%'}} transition={{duration:reduced?0:.65,ease:[.22,.7,.2,1]}}/></span>
      <span className="scan-game-count" aria-label={`${equipped?1:0} clothing items found`}><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M11 7a3 3 0 1 1 4 3v3l10 8a2 2 0 0 1-1 3H4a2 2 0 0 1-1-3l12-8" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/></svg><motion.b key={equipped?'one':'zero'} initial={equipped&&!reduced?{scale:1.6}:false} animate={{scale:1}}>{equipped?1:0}</motion.b></span>
    </div>
    <div className="scan-game-prompt"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m11 4-6 5H2v6h3l6 5V4Zm4 4c3 3 3 5 0 8m4-12c5 5 5 11 0 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span>Trouve le t-shirt blanc.</span></div>
    <div className="scan-avatar-scene">
      <svg className="scan-paris-landmark" viewBox="0 0 180 180" aria-hidden="true"><g fill="#d8eeff"><path d="M18 114c-18 0-18-26 0-26 1-24 35-24 37-5 23-5 30 31 4 31Z"/><path d="M118 53c-18 0-18-22-3-24 3-24 36-24 39-4 23-3 27 28 6 28Z"/></g><g fill="none" stroke="#69b9fa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M117 28v17m-3 0c-2 50-12 94-39 125h84c-27-31-37-75-39-125m-23 81h41m-52 24h64m-48 20c0-28 32-28 32 0m-30-72h28m-23 28 28 24m0-24-28 24"/></g></svg>
      <div className="scan-avatar-ground"/>
      <FeedbackAvatar equipped={equipped} reduced={reduced}/>
      <AnimatePresence>{equipped&&<motion.div className="scan-success-glints" initial={{opacity:0,scale:.5}} animate={{opacity:1,scale:1}} exit={{opacity:0}} aria-hidden="true"><span>✦</span><span>✦</span><span>✧</span></motion.div>}</AnimatePresence>
    </div>
    <div className="scan-feedback-footer"><AnimatePresence>{equipped&&<motion.div className="scan-found-banner" role="status" initial={reduced?false:{opacity:0,y:25,scale:.9}} animate={{opacity:1,y:0,scale:1}} transition={{duration:reduced?0:.5,type:'spring',bounce:.25}}><span className="scan-found-check" aria-hidden="true">✓</span><strong>You found it!</strong></motion.div>}</AnimatePresence></div>
  </div>
}

export default function ScanFeedbackDemo({active=true}) {
  const reduced=useReducedMotion()
  const [phase,setPhase]=useState('playing')
  const cue={outline:'scan',cartoon:'morph',split:'pop',flying:'whoosh',success:'success'}[phase]
  useSoundSequence(phase,cue?[{name:cue,volume:phase==='success'?.9:.65}]:[])
  const [needsPlay,setNeedsPlay]=useState(false)
  const [flight,setFlight]=useState(null)
  const rootRef=useRef(null)
  const videoRef=useRef(null)
  const timers=useRef([])
  const split=['split','flying','success'].includes(phase)
  const cartoon=['cartoon','split','flying','success'].includes(phase)
  const ended=phase!=='playing'

  useEffect(()=>{
    if(!active)return
    const video=videoRef.current
    video.muted=true
    video.play().catch(()=>setNeedsPlay(true))
    const scheduled=timers.current
    return()=>{video.pause();scheduled.forEach(clearTimeout)}
  },[active])
  const finishVideo=()=>{
    if(phase!=='playing')return
    videoRef.current.pause()
    if(reduced){setPhase('success');return}
    setPhase('outline')
    timers.current.push(
      setTimeout(()=>setPhase('cartoon'),700),
      setTimeout(()=>setPhase('split'),1250),
      setTimeout(()=>setPhase('flying'),2100),
      setTimeout(()=>setPhase('success'),2900),
    )
  }
  useLayoutEffect(()=>{
    if(phase!=='flying')return
    const root=rootRef.current
    const measure=()=>{
      const bounds=root.getBoundingClientRect()
      const relative=selector=>{
        const r=root.querySelector(selector).getBoundingClientRect()
        return {left:r.left-bounds.left,top:r.top-bounds.top,width:r.width,height:r.height}
      }
      setFlight({from:relative('.scan-shirt-source'),to:relative('.scan-avatar-shirt-target')})
    }
    measure()
    const resize=new ResizeObserver(measure)
    resize.observe(root)
    return()=>resize.disconnect()
  },[phase])
  const play=event=>{
    event.stopPropagation()
    videoRef.current.play().then(()=>setNeedsPlay(false)).catch(()=>setNeedsPlay(true))
  }
  return <motion.div ref={rootRef} className={`scan-feedback-demo ${split?'scan-feedback-split':''}`} data-phase={phase} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
    <div className="scan-feedback-recording">
      <div className="scan-feedback-recording-inner">
        <video ref={videoRef} src="/videos/scan-feedback.mp4" poster="/videos/scan-feedback-poster.webp" muted playsInline preload="auto" aria-label="Camille scans and finds a white T-shirt, playing once without sound" onEnded={finishVideo} onPlay={()=>setNeedsPlay(false)} onVolumeChange={event=>{event.currentTarget.muted=true}}/>
        {ended&&<img className="scan-feedback-last-frame" src="/videos/scan-feedback-last.webp" alt="The final video frame: Camille holds the white T-shirt"/>}
        <svg className="scan-shirt-outline" viewBox="0 0 1280 720" aria-hidden="true"><AnimatePresence>{ended&&<motion.path d={shirtOutline} initial={{pathLength:0,opacity:1}} animate={{pathLength:1,opacity:phase==='success'?0:1,fill:cartoon?'#ffffffed':'#ffffff00'}} transition={{pathLength:{duration:reduced?0:.65},fill:{duration:.3},opacity:{duration:.2}}}/>}</AnimatePresence></svg>
        <span className="scan-shirt-source" aria-hidden="true"><AnimatePresence>{cartoon&&phase!=='flying'&&phase!=='success'&&<motion.div className="scan-cartoon-shirt" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} exit={{opacity:0}}><Shirt/></motion.div>}</AnimatePresence></span>
      </div>
      {needsPlay&&<button className="video-play-button" onClick={play}>Play video <span aria-hidden="true">▶</span></button>}
    </div>
    <motion.div className="scan-feedback-game" initial={false} animate={{opacity:split?1:0,x:split?0:30,scale:split?1:.94}} transition={{duration:reduced?0:.45,delay:reduced?0:.15,ease:[.22,.7,.2,1]}} aria-hidden={!split}>
      <ScanFeedbackScreen phase={phase} reduced={reduced}/>
    </motion.div>
    {phase==='flying'&&flight&&<motion.div className="scan-flying-shirt" initial={{...flight.from,rotate:-8}} animate={{...flight.to,rotate:0}} transition={{duration:.75,ease:[.4,0,.16,1]}}><Shirt/></motion.div>}
  </motion.div>
}
