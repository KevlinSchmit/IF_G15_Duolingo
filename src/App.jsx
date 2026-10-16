import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './App.css'
import FrenchDuo from './FrenchDuo'
import SceneTransition from './SceneTransition'
import AdventureScene from './AdventureScene'
import CamilleTransformation from './CamilleTransformation'
import CamilleIdle from './CamilleIdle'
import OutfitZoom from './OutfitZoom'
import DiscoveryPoster from './DiscoveryPoster'
import { Flowers, Sunglasses, Scarf, Tower } from './FrenchAccessories'
import SoundToggle from './SoundToggle'
import { usePresentationSound } from './audio/useSoundEffects'

function Spark({className}) {return <svg className={className} viewBox="0 0 60 60" aria-hidden="true"><path d="M30 0c3 21 9 27 30 30-21 3-27 9-30 30C27 39 21 33 0 30 21 27 27 21 30 0Z" fill="currentColor"/></svg>}

function Floating({className, children, delay = 0, rotation = 0, reduced}) {
  return <motion.div className={`floating ${className}`} initial={reduced ? false : {opacity:0,scale:.65,y:30,rotate:rotation-10}} animate={{opacity:1,scale:1,y:0,rotate:rotation}} transition={{delay:reduced ? 0 : delay,duration:.6,type:'spring',bounce:.35}}>
    <motion.div className="float-inner" animate={reduced ? {} : {y:[0,-10,0],rotate:[0,2,0]}} transition={{duration:4.5+delay,repeat:Infinity,delay,ease:'easeInOut'}}>{children}</motion.div>
  </motion.div>
}
const tourPages=['tour-kiosks','tour-clothing','tour-duomart','tour-overview']
const members=['Leanne Wang','Beatrice Madden','Makeda West','Thomas Du','Reagan Sacks']
const slides=['opening','camille','discovery','adventure',...tourPages,'proficiency','clothing','scan','scan-results','sharing','leaderboard','outfit','learner']

export default function App() {
  const reduced = useReducedMotion()
  const [videoReplay,setVideoReplay] = useState(0)
  const [page,setPage] = useState('opening')
  usePresentationSound(page)
  const [posterImpacted,setPosterImpacted] = useState(false)
  const [transitionOrigin,setTransitionOrigin] = useState(null)
  const duoRef = useRef(null)
  const portraitRef = useRef(null)
  const [transformOrigin,setTransformOrigin] = useState(null)
  const [outfitOrigin,setOutfitOrigin]=useState(null)
  const transitionLock = useRef(false)
  const startJourney = useCallback(() => {
    if (transitionLock.current || page !== 'opening') return
    if (reduced) {setPage('camille');return}
    transitionLock.current = true
    const rect = duoRef.current.querySelector('svg').getBoundingClientRect()
    setTransitionOrigin({left:rect.left,top:rect.top,width:rect.width,height:rect.height})
    setPage('camille')
  }, [page,reduced])
  const startDiscovery=useCallback(()=>{
    if(transitionLock.current||page!=='camille')return
    setPosterImpacted(false)
    setPage('discovery')
    if(window.matchMedia('(max-width:750px)').matches)window.scrollTo({top:0,behavior:reduced?'instant':'smooth'})
  },[page,reduced])
  const startTransformation = useCallback(() => {
    if (transitionLock.current || page !== 'discovery') return
    if (reduced) {setPage('adventure');return}
    transitionLock.current=true
    const portraitWindow=portraitRef.current.querySelector('.portrait-window')
    const rect=portraitWindow.getBoundingClientRect()
    const matrix=new DOMMatrix(getComputedStyle(portraitRef.current).transform)
    const width=portraitWindow.offsetWidth,height=portraitWindow.offsetHeight
    setTransformOrigin({left:rect.left+(rect.width-width)/2,top:rect.top+(rect.height-height)/2,width,height,rotate:Math.atan2(matrix.b,matrix.a)*180/Math.PI})
  },[page,reduced])
  const startKiosk = useCallback(()=>{if(!transitionLock.current&&(page==='adventure'||tourPages.includes(page)))setPage(slides[slides.indexOf(page)+1])},[page])
  const startClothing=useCallback(()=>{if(!transitionLock.current&&page==='proficiency')setPage('clothing')},[page])
  const startScan=useCallback(()=>{if(!transitionLock.current&&page==='clothing')setPage('scan')},[page])
  const startScanResults=useCallback(()=>{if(!transitionLock.current&&page==='scan')setPage('scan-results')},[page])
  const startSharing=useCallback(()=>{if(!transitionLock.current&&page==='scan-results')setPage('sharing')},[page])
  const startLeaderboard=useCallback(()=>{if(!transitionLock.current&&page==='sharing')setPage('leaderboard')},[page])
  const startOutfit=useCallback(()=>{
    if(transitionLock.current||page!=='leaderboard')return
    const source=document.querySelector('.winner-outfit-origin')
    if(!source)return
    if(!reduced){
      const rect=source.getBoundingClientRect()
      transitionLock.current=true
      setOutfitOrigin({left:rect.left,top:rect.top,width:rect.width,height:rect.height})
      return
    }
    setPage('outfit')
  },[page,reduced])
  useEffect(()=>{
    const sources=page==='camille'?['/installation-discovery-poster.png','/camille-animation-body.png','/paris-adventure-sky.png']:page==='leaderboard'?['/duo-winning-outfit.png']:[]
    sources.forEach(src=>{const image=new Image();image.src=src;image.decode().catch(()=>{})})
  },[page])
  const startLearner=useCallback(()=>{if(!transitionLock.current&&page==='outfit')setPage('learner')},[page])
  const goBack = useCallback(() => {if(!transitionLock.current)setPage(current=>slides[Math.max(0,slides.indexOf(current)-1)])}, [])
  useEffect(() => {
    const onKey = event => {
      if (event.target.closest('button')) return
      if (['ArrowRight','Enter',' '].includes(event.key) && page !== 'learner') {event.preventDefault();if (page === 'opening') startJourney();else if(page==='camille')startDiscovery();else if(page==='discovery')startTransformation();else if(page==='adventure'||tourPages.includes(page))startKiosk();else if(page==='proficiency')startClothing();else if(page==='clothing')startScan();else if(page==='scan')startScanResults();else if(page==='scan-results')startSharing();else if(page==='sharing')startLeaderboard();else if(page==='leaderboard')startOutfit();else startLearner()}
      if (event.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown',onKey)
    return () => window.removeEventListener('keydown',onKey)
  }, [page,startJourney,startDiscovery,startTransformation,startKiosk,startClothing,startScan,startScanResults,startSharing,startLeaderboard,startOutfit,startLearner,goBack])
  const [fullscreen,setFullscreen] = useState(false)
  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])
  const advance = () => {
    if (transitionLock.current) return
    if (page==='opening') startJourney()
    else if (page==='camille') startDiscovery()
    else if (page==='discovery') startTransformation()
    else if (page==='adventure'||tourPages.includes(page)) startKiosk()
    else if (page==='proficiency') startClothing()
    else if (page==='clothing') startScan()
    else if (page==='scan') startScanResults()
    else if (page==='scan-results') startSharing()
    else if (page==='sharing') startLeaderboard()
    else if (page==='leaderboard') startOutfit()
    else if (page==='outfit') startLearner()
    else setVideoReplay(current => current+1)
  }
  const enterFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await document.documentElement.requestFullscreen?.()
    setFullscreen(Boolean(document.fullscreenElement))
  }
  return <main className={`profile-page ${page==='discovery'?'profile-poster-page':''} ${page==='outfit'||page==='learner'?'outfit-page':''} ${transitionOrigin || transformOrigin || outfitOrigin ? 'is-transitioning' : ''} ${transformOrigin ? 'transformation-active' : ''} ${!['opening','camille','discovery'].includes(page) ? 'adventure-page' : ''}`} aria-busy={!!transitionOrigin || !!transformOrigin || !!outfitOrigin} onClick={event=>{if(!event.target.closest('button, a, [role="button"]'))advance()}}>
    <header className="masthead"><span className="wordmark">duolingo</span><div className="masthead-actions"><SoundToggle/><button className="fullscreen-button" onClick={enterFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>⛶</button></div></header>
    <AnimatePresence mode="wait">
    {page === 'opening' ? <motion.section key="opening" className="opening-scene" aria-label="Opening slide" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? .1 : .35}}>
      <div className="opening-copy"><motion.h1 initial={reduced ? false : {opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.6}}><span className="opening-title-brand">Duolingo x</span>{' '}French Fashion Challenge</motion.h1><motion.div className="opening-subtitles" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : .4}}><h2>Group 15</h2><p>{members.map((name,index)=><span key={name}><span className="opening-member">{name}</span>{index<members.length-1?', ':''}</span>)}</p></motion.div></div>
      <div className="opening-decoration" aria-hidden="true"><Spark/></div>
      <div ref={duoRef} className={`opening-duo ${transitionOrigin ? 'duo-in-transition' : ''}`}><span className="duo-greeting">salut !</span><FrenchDuo/></div>
    </motion.section> : page === 'camille'||page==='discovery' ? <motion.div key="camille" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? .1 : transformOrigin ? .16 : .35}}><section className="profile-scene" aria-label={page==='discovery'?'Camille discovers the French-fashion installation':'Meet Camille'}>
      <div className="headline-block">
        <motion.div className="headline-content" aria-hidden={page==='discovery'&&posterImpacted} animate={page==='discovery'&&posterImpacted?{opacity:0,filter:'blur(8px)',y:18,scale:.97}:{opacity:1,filter:'blur(0px)',y:0,scale:1}} transition={{duration:reduced?0:.28}}>
        <motion.p className="intro-label" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:reduced ? 0 : .5}}>SAY BONJOUR TO</motion.p>
        <motion.h1 initial={reduced ? false : {opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:reduced ? 0 : .15}}>meet<br/>Camille<span>.</span></motion.h1>
        <motion.ul className="profile-description profile-facts" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : .6}}><li>19-year-old fashion enthusiast</li><li>Dreams of visiting Paris</li><li>Finds traditional vocabulary lessons boring</li></motion.ul>
        <motion.div className="profile-caption" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced ? 0 : .9}}><span className="french-flag"><i/><i/><i/></span><span>Next stop? France.</span></motion.div>
        </motion.div>
        <AnimatePresence>{page==='discovery'&&<DiscoveryPoster key="discovery-poster" reduced={reduced} onImpact={()=>setPosterImpacted(true)}/>}</AnimatePresence>
      </div>
      <div className="portrait-world">
        <div className="portrait-backdrop"/>
        <motion.div ref={portraitRef} className="portrait-frame" initial={reduced ? false : {opacity:0,scale:.85,rotate:-5}} animate={{opacity:1,scale:1,rotate:-5}} transition={{duration:.8,type:'spring',bounce:.2}}>
          <div className="portrait-window"><img className="portrait-real" src="/camille-portrait.png" alt="Camille smiling, with brown hair and bangs, wearing a cream sweater"/><div className="portrait-cartoon portrait-puppet" aria-hidden="true"><CamilleIdle active={false} portrait/></div><div className="portrait-flash" aria-hidden="true"/></div>
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
    </section></motion.div> : <motion.div key="adventure" className="presentation-scene" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? .1 : .25}}><AdventureScene tourStep={tourPages.includes(page)?page.slice(5):null} hideCharacter={!!transformOrigin} focused={page==='proficiency'||page==='clothing'||page==='scan'||page==='scan-results'||page==='sharing'||page==='leaderboard'||page==='outfit'||page==='learner'} showGallery={page==='scan-results'} showLeaderboard={page==='leaderboard'} showOutfit={page==='outfit'||page==='learner'} showLearner={page==='learner'} hideOutfitCharacter={!!outfitOrigin} demo={page==='sharing'||page==='leaderboard'||page==='outfit'||page==='learner'?'sharing':page==='scan'||page==='scan-results'?'scan':page==='clothing'?'clothing':'proficiency'} onSelectKiosk={startKiosk} videoReplay={videoReplay}/></motion.div>}
    </AnimatePresence>
    {transitionOrigin && <SceneTransition origin={transitionOrigin} onComplete={()=>{setTransitionOrigin(null);transitionLock.current=false}}/>}
    {transformOrigin && <CamilleTransformation portraitRef={portraitRef} origin={transformOrigin} onReveal={()=>setPage('adventure')} onComplete={()=>{setTransformOrigin(null);transitionLock.current=false}}/>}
    {outfitOrigin&&<OutfitZoom origin={outfitOrigin} onReveal={()=>setPage('outfit')} onComplete={()=>{setOutfitOrigin(null);transitionLock.current=false}}/>}
    <footer><button className="back-button" onClick={goBack} disabled={page === 'opening' || !!transitionOrigin || !!transformOrigin || !!outfitOrigin} aria-label="Previous slide">←</button><button disabled={!!transitionOrigin || !!transformOrigin || !!outfitOrigin} onClick={advance} className="replay-button">{page === 'opening' ? 'Click anywhere to begin' : page === 'camille' ? 'Discover the installation' : page==='discovery' ? 'Enter Camille’s world' : page==='adventure' ? 'Explore the kiosks' : page==='tour-kiosks' ? 'Explore the clothing stations' : page==='tour-clothing' ? 'Visit Duomart' : page==='tour-duomart' ? 'Back to the full installation' : page==='tour-overview' ? 'Start Personalized Learning' : page==='proficiency' ? 'Receive a Prompt' : page==='clothing' ? 'Scan and Receive Feedback' : page==='scan' ? 'See scan results' : page==='scan-results' ? 'Save Your Outfit' : page==='sharing' ? 'See the community leaderboard' : page==='leaderboard' ? 'Explore the winning outfit' : page==='outfit' ? 'See Emma’s progress' : 'Replay the labels'} <span aria-hidden="true">{page === 'learner' ? '↻' : '→'}</span></button><span className="page-number">{String(slides.indexOf(page)+1).padStart(2,'0')} <span>/ {slides.length}</span></span></footer>
  </main>
}
