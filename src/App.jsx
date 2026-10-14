import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './App.css'

function Shirt() {
  return <svg viewBox="0 0 160 150" fill="none" aria-hidden="true"><path d="m49 22-36 27 23 36 17-10v62h61V75l17 10 23-36-36-27-19 11H68L49 22Z" fill="#FF9600"/><path d="M62 25q18 28 38 0" stroke="#FFD667" strokeWidth="12"/><path d="M58 99h47" stroke="#FFB93D" strokeWidth="10" strokeLinecap="round"/><path d="m26 46 17 25M119 71l17-25" stroke="#FFB93D" strokeWidth="9" strokeLinecap="round"/></svg>
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
  const [fullscreen,setFullscreen] = useState(false)
  const enterFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen?.()
    setFullscreen(Boolean(document.fullscreenElement))
  }
  return <main className="profile-page">
    <header className="masthead"><span className="wordmark">duolingo</span><span className="chapter-label">A LITTLE FRENCH. A BIG DREAM.</span><button className="fullscreen-button" onClick={enterFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>⛶</button></header>
    <section key={replay} className="profile-scene" aria-label="Meet Camille">
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
        <Floating className="shirt-sticker" delay={.7} rotation={-15} reduced={reduced}><Shirt/></Floating>
        <Floating className="paris-sticker" delay={.9} rotation={12} reduced={reduced}><div className="tower-card"><Tower/><span>MON RÊVE</span></div></Floating>
        <Floating className="age-sticker" delay={1.1} rotation={9} reduced={reduced}><span>19<span>YEARS YOUNG</span></span></Floating>
        <Floating className="spark-yellow" delay={.6} reduced={reduced}><Spark/></Floating>
        <Floating className="spark-white" delay={1} reduced={reduced}><Spark/></Floating>
        <Floating className="little-heart" delay={1.2} rotation={-12} reduced={reduced}>♥</Floating>
      </div>
    </section>
    <footer><span className="story-label">HER STORY STARTS HERE</span><button onClick={()=>setReplay(replay+1)} className="replay-button">Replay the introduction <span aria-hidden="true">↻</span></button><span className="page-number">01 <span>/ CAMILLE</span></span></footer>
  </main>
}
