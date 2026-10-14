import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './App.css'
import FrenchDuo from './FrenchDuo'
import SceneTransition from './SceneTransition'

function Flowers() {
  return <svg viewBox="0 0 170 190" fill="none" aria-hidden="true">
    <path d="M60 83 88 157M115 76 87 157M87 68v85" stroke="#1CB0F6" strokeWidth="10" strokeLinecap="round"/>
    <path d="M83 124c-32 1-39-17-36-25 23-6 39 6 36 25ZM92 135c29 1 44-15 39-25-24-5-39 8-39 25Z" fill="#1CB0F6"/>
    <path d="m47 108 81-2-24 65c-3 9-23 14-33 2l-24-65Z" fill="#FFF" stroke="#FFF" strokeWidth="8" strokeLinejoin="round"/>
    <path d="m48 109 33 41 47-44-80 3Z" fill="#1CB0F6"/>
    <path d="M75 149c11-8 23-5 27 1" stroke="#FF4B4B" strokeWidth="9" strokeLinecap="round"/>
    <path d="M38 59c-14-14-6-34 12-35 5-21 30-22 39-7 20-2 32 19 23 33 7 17-10 36-29 31-12 14-38 4-39-10l-6-12Z" fill="#FF4B4B" stroke="#FFF" strokeWidth="5" strokeLinejoin="round"/>
    <path d="M64 39c12-12 35-4 31 12-3 15-27 18-30 3-2-9 12-12 17-5" stroke="#FFF" strokeWidth="6" strokeLinecap="round"/>
    <path d="M115 51c-4-12 8-23 19-19 9-12 27-5 26 9 13 8 9 26-4 30-5 15-24 15-30 4-14 1-22-15-11-24Z" fill="#FF4B4B" stroke="#FFF" strokeWidth="5"/>
    <path d="M130 52c8-8 22-2 18 7-3 6-12 7-14 1" stroke="#FFF" strokeWidth="5" strokeLinecap="round"/>
    <path d="M28 79c-10-6-6-22 5-25 2-13 19-17 27-7 12-3 22 10 16 21 8 14-9 27-21 20-12 8-24 2-27-9Z" fill="#FF4B4B" stroke="#FFF" strokeWidth="5"/>
    <path d="M43 65c10-6 21 1 16 9-3 5-11 4-13 0" stroke="#FFF" strokeWidth="5" strokeLinecap="round"/>
  </svg>
}
function Sunglasses() {
  return <svg viewBox="0 0 190 100" fill="none" aria-hidden="true">
    <path d="m17 40-8-13M173 40l8-13" stroke="#FFF" strokeWidth="13" strokeLinecap="round"/>
    <path d="M18 29c-6 0-9 6-8 12l5 26c2 14 13 20 30 20h13c14 0 22-8 25-20l4-17c2-8 14-8 16 0l4 17c3 12 11 20 25 20h13c17 0 28-6 30-20l5-26c1-6-2-12-8-12H18Z" fill="#FF4B4B" stroke="#FFF" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M26 42h44l-4 20c-1 7-5 12-13 12H44c-9 0-14-3-15-10l-3-22ZM120 42h44l-3 22c-1 7-6 10-15 10h-9c-8 0-12-5-13-12l-4-20Z" fill="#1CB0F6"/>
    <path d="m39 48 15 15M135 48l15 15" stroke="#FFF" strokeWidth="6" strokeLinecap="round"/>
  </svg>
}
function Scarf() {
  return <svg viewBox="0 0 140 170" fill="none" aria-hidden="true">
    <path d="M38 59 29 139c-1 6 4 10 10 10h27c5 0 8-4 8-8l-1-74M79 63l13 70c1 5 4 8 9 7l22-4c5-1 7-5 6-9L112 52" fill="#1CB0F6" stroke="#FFF" strokeWidth="6" strokeLinejoin="round"/>
    <path d="m35 111 34 4M34 128l35 4M92 101l30-6M95 117l30-6" stroke="#FFF" strokeWidth="9"/>
    <path d="M40 27c19-13 43-13 63-4 12 5 19 16 13 28-9 20-46 31-75 15-21-11-19-28-1-39Z" fill="#FF4B4B" stroke="#FFF" strokeWidth="6"/>
    <path d="M43 37c13-8 32-10 47-5" stroke="#FFF" strokeWidth="7" strokeLinecap="round"/>
    <path d="m38 150-1 9M50 152v10M62 150l1 9M103 142l2 9M116 140l2 9" stroke="#FFF" strokeWidth="6" strokeLinecap="round"/>
  </svg>
}
function Tower() {
  return <svg viewBox="0 0 160 200" fill="none" aria-hidden="true"><path d="M80 14v21M69 35h22M78 35c-2 43-16 95-48 142h100C98 130 84 78 82 35" stroke="#FFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/><path d="M53 114h54M38 151h84M57 177c1-35 45-35 46 0M62 76h36" stroke="#FFF" strokeWidth="10" strokeLinecap="round"/><path d="m58 115 43 35M102 115l-44 35" stroke="#FFF" strokeWidth="7"/><path d="M20 184h120" stroke="#FFF" strokeWidth="12" strokeLinecap="round"/></svg>
}
function Spark({className}) {return <svg className={className} viewBox="0 0 60 60" aria-hidden="true"><path d="M30 0c3 21 9 27 30 30-21 3-27 9-30 30C27 39 21 33 0 30 21 27 27 21 30 0Z" fill="currentColor"/></svg>}

function Floating({className, children, delay = 0, rotation = 0, reduced}) {
  return <motion.div className={`floating ${className}`} initial={reduced ? false : {opacity:0,scale:.65,y:30,rotate:rotation-10}} animate={{opacity:1,scale:1,y:0,rotate:rotation}} transition={{delay:reduced ? 0 : delay,duration:.6,type:'spring',bounce:.35}}>
    <motion.div className="float-inner" animate={reduced ? {} : {y:[0,-10,0],rotate:[0,2,0]}} transition={{duration:4.5+delay,repeat:Infinity,delay,ease:'easeInOut'}}>{children}</motion.div>
  </motion.div>
}
export default function App() {
  const reduced = useReducedMotion()
  const [replay,setReplay] = useState(0)
  const [page,setPage] = useState('opening')
  const [transitionOrigin,setTransitionOrigin] = useState(null)
  const duoRef = useRef(null)
  const transitionLock = useRef(false)
  const startJourney = useCallback(() => {
    if (transitionLock.current || page !== 'opening') return
    if (reduced) {setPage('camille');return}
    transitionLock.current = true
    const rect = duoRef.current.querySelector('svg').getBoundingClientRect()
    setTransitionOrigin({left:rect.left,top:rect.top,width:rect.width,height:rect.height})
    setPage('camille')
  }, [page,reduced])
  const goBack = useCallback(() => {if (!transitionLock.current) {setPage('opening')}}, [])
  useEffect(() => {
    const onKey = event => {
      if (event.target.closest('button')) return
      if (['ArrowRight','Enter',' '].includes(event.key) && page === 'opening') {event.preventDefault();startJourney()}
      if (event.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown',onKey)
    return () => window.removeEventListener('keydown',onKey)
  }, [page,startJourney,goBack])
  const [fullscreen,setFullscreen] = useState(false)
  const enterFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen?.()
    setFullscreen(Boolean(document.fullscreenElement))
  }
  return <main className={`profile-page ${transitionOrigin ? 'is-transitioning' : ''}`} aria-busy={!!transitionOrigin}>
    <header className="masthead"><span className="wordmark">duolingo</span><span className="chapter-label">A LITTLE FRENCH. A BIG DREAM.</span><button className="fullscreen-button" onClick={enterFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>⛶</button></header>
    <AnimatePresence mode="wait">
    {page === 'opening' ? <motion.section key="opening" className="opening-scene" aria-label="Opening slide" onClick={startJourney} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? .1 : .22}}>
      <div className="opening-copy"><motion.p className="intro-label" initial={reduced ? false : {opacity:0,y:15}} animate={{opacity:1,y:0}}>BONJOUR !</motion.p><motion.h1 initial={reduced ? false : {opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.6}}>TEXT<span>.</span></motion.h1><motion.div className="opening-subtitles" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : .4}}><h2>text text</h2><p>text text</p></motion.div></div>
      <div className="opening-decoration" aria-hidden="true"><Spark/></div>
      <div ref={duoRef} className={`opening-duo ${transitionOrigin ? 'duo-in-transition' : ''}`}><span className="duo-greeting">salut !</span><FrenchDuo/></div>
    </motion.section> : <motion.div key="camille" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? .1 : .22}}><section key={replay} className="profile-scene" aria-label="Meet Camille">
      <div className="headline-block">
        <motion.p className="intro-label" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:reduced ? 0 : .5}}>SAY BONJOUR TO</motion.p>
        <motion.h1 initial={reduced ? false : {opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:reduced ? 0 : .15}}>meet<br/>Camille<span>.</span></motion.h1>
        <motion.p className="profile-description" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : .6}}>19 years old. A fashion lover.<br/>And a little obsessed with Paris.</motion.p>
        <motion.div className="profile-caption" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : .9}}><span className="french-flag"><i/><i/><i/></span><span>Next stop? France.</span></motion.div>
      </div>
      <div className="portrait-world">
        <div className="portrait-backdrop"/>
        <motion.div className="portrait-frame" initial={reduced ? false : {opacity:0,scale:.85,rotate:-5}} animate={{opacity:1,scale:1,rotate:-5}} transition={{duration:.8,type:'spring',bounce:.2}}>
          <img src="/camille-portrait.png" alt="Camille smiling, with brown hair and bangs, wearing a cream sweater"/>
          <div className="photo-caption"><span>c’est Camille !</span><span className="caption-heart">♥</span></div>
        </motion.div>
        <Floating className="outfits-word" delay={.45} rotation={-12} reduced={reduced}>outfits</Floating>
        <Floating className="paris-word" delay={.75} rotation={10} reduced={reduced}>paris<span>♡</span></Floating>
        <Floating className="flowers-sticker" delay={.7} rotation={-15} reduced={reduced}><Flowers/></Floating>
        <Floating className="paris-sticker" delay={.9} rotation={12} reduced={reduced}><div className="tower-card"><Tower/><span>MON RÊVE</span></div></Floating>
        <Floating className="sunglasses-sticker" delay={.8} rotation={-14} reduced={reduced}><Sunglasses/></Floating>
        <Floating className="scarf-sticker" delay={1} rotation={12} reduced={reduced}><Scarf/></Floating>
        <Floating className="age-sticker" delay={1.1} rotation={9} reduced={reduced}><span>19<span>YEARS YOUNG</span></span></Floating>
        <Floating className="spark-blue" delay={.6} reduced={reduced}><Spark/></Floating>
        <Floating className="spark-white" delay={1} reduced={reduced}><Spark/></Floating>
        <Floating className="little-heart" delay={1.2} rotation={-12} reduced={reduced}>♥</Floating>
      </div>
    </section></motion.div>}
    </AnimatePresence>
    {transitionOrigin && <SceneTransition origin={transitionOrigin} onComplete={()=>{setTransitionOrigin(null);transitionLock.current=false}}/>}
    <footer><button className="back-button" onClick={goBack} disabled={page === 'opening' || !!transitionOrigin} aria-label="Back to opening">←</button><button disabled={!!transitionOrigin} onClick={()=>page === 'opening' ? startJourney() : setReplay(replay+1)} className="replay-button">{page === 'opening' ? 'Click anywhere to begin' : 'Replay the introduction'} <span aria-hidden="true">{page === 'opening' ? '→' : '↻'}</span></button><span className="page-number">{page === 'opening' ? '01' : '02'} <span>/ 02</span></span></footer>
  </main>
}
