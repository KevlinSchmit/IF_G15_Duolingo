import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './App.css'

const asset = '/camille-characters.png'

export default function App() {
  const [scene, setScene] = useState('real')
  const [transition, setTransition] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const reduced = useReducedMotion()
  const cartoon = scene === 'duo'
  const advance = () => {
    if (transition || !loaded) return
    setTransition('cover')
  }
  useEffect(() => {
    const image = new Image()
    image.onload = () => setLoaded(true)
    image.src = asset
  }, [])
  useEffect(() => {
    const onKey = (event) => {
      if (event.target.closest('button')) return
      if ([' ', 'Enter', 'ArrowRight'].includes(event.key)) {
        event.preventDefault()
        if (!transition && loaded) setTransition('cover')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [transition, loaded])

  return <main className={cartoon ? 'presentation cartoon-scene' : 'presentation'} onClick={advance}>
    <header><span className="brand">duolingo<span> ✦</span></span><span className="chapter">A LITTLE FRENCH. A BIG DREAM.</span><span className="scene-count">{cartoon ? '02' : '01'} <span>/ 02</span></span></header>
    <div className="ambient ambient-one" aria-hidden="true"/><div className="ambient ambient-two" aria-hidden="true"/>
    <section className="intro" aria-label={cartoon ? 'Camille as a Duolingo character' : 'Meet Camille'}>
      <div className="portrait-stage">
        <div className="portrait-orbit" aria-hidden="true"/>
        <motion.span className="floating-spark spark-one" aria-hidden="true" animate={reduced ? {} : {rotate:[-10,10,-10], y:[0,-12,0]}} transition={{duration:4,repeat:Infinity}}>✦</motion.span>
        <span className="floating-spark spark-two" aria-hidden="true">✧</span>
        <AnimatePresence mode="wait">
          <motion.div key={scene} className={`character character-${scene}`} role="img" aria-label={cartoon ? 'Smiling cartoon Camille in her cream sweater and beige trousers' : 'Smiling Camille with brown hair, a cream sweater and beige trousers'} style={{backgroundImage:`url(${asset})`}} initial={{opacity:0,scale:.94,y:20}} animate={{opacity:loaded ? 1 : 0,scale:1,y:0}} exit={{opacity:0}} transition={{duration:reduced ? 0 : .55}}/>
        </AnimatePresence>
        <motion.div className="portrait-label" key={`label-${scene}`} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.2}}><span>{cartoon ? '✦' : '♡'}</span>{cartoon ? 'Same Camille. New adventure.' : 'A dreamer, with a destination.'}</motion.div>
      </div>
      <div className="intro-copy">
        <p className="eyebrow"><span/> {cartoon ? 'HER LANGUAGE JOURNEY BEGINS' : 'EVERY JOURNEY STARTS WITH SOMEONE'}</p>
        <motion.h1 key={`title-${scene}`} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.5}}>Meet<br/><span>Camille<span className="title-dot">.</span></span></motion.h1>
        <p className="lead">{cartoon ? 'One dream. A whole new world of words.' : 'A love for fashion. A dream of France.'}</p>
        <div className="details">
          <div><span className="detail-icon age-icon" aria-hidden="true">19</span><p><span>A LITTLE ABOUT HER</span>19 years old</p></div>
          <div><span className="detail-icon fashion-icon" aria-hidden="true">♡</span><p><span>HER PASSION</span>Loves fashion</p></div>
          <div><span className="detail-icon france-icon" aria-hidden="true"><i/><i/><i/></span><p><span>HER NEXT CHAPTER</span>Wants to go to France</p></div>
        </div>
      </div>
    </section>
    <footer><div className="scene-track"><span className="selected"/><span className={cartoon ? 'selected' : ''}/></div><button onClick={(event) => {event.stopPropagation();advance()}} disabled={!!transition || !loaded} className="continue">{!loaded ? 'Preparing Camille…' : cartoon ? 'Click anywhere to meet her again' : 'Click anywhere to start her journey'}<span aria-hidden="true">{cartoon ? '↺' : '→'}</span></button><span className="footer-note">{cartoon ? 'BONJOUR, CAMILLE !' : 'LET’S MEET OUR LEARNER'}</span></footer>
    <div className="sr-only" aria-live="polite">{transition ? 'Duo is transforming Camille.' : cartoon ? 'Camille is now a Duolingo-style character.' : 'Camille’s introduction. Click anywhere or press Enter to transform her.'}</div>
    {transition && <motion.div className="transition-curtain" aria-hidden="true" initial={{x:'-105%'}} animate={{x:transition === 'cover' ? '0%' : '105%'}} transition={{duration:reduced ? .1 : .85,ease:[.65,0,.35,1]}} onAnimationComplete={() => {
      if (transition === 'cover') {setScene(cartoon ? 'real' : 'duo');setTransition('reveal')}
      else setTransition(null)
    }}>
      <div className="flag-band flag-blue"/><div className="flag-band flag-white"/><div className="flag-band flag-red"/>
      <div className="transition-message"><span>UN PETIT PAS…</span><strong>A whole new adventure.</strong></div>
      <motion.div className="cycling-duo" style={{backgroundImage:`url(${asset})`}} animate={reduced ? {} : {y:[0,-8,0],rotate:[-3,2,-3]}} transition={{duration:.35,repeat:Infinity}}/>
      <span className="speed-line speed-one"/><span className="speed-line speed-two"/><span className="speed-line speed-three"/>
    </motion.div>}
  </main>
}
