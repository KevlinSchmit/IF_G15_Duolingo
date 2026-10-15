import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './OutfitDetail.css'
import LearnerProgress from './LearnerProgress'

const clothes=[
  {id:'hat',word:'Le tricorne à plumes',english:'Feathered tricorne hat',desktop:{point:[440,280],bend:[770,210],end:[895,210]},mobile:{point:[300,350],bend:[465,290],end:[505,290]}},
  {id:'coat',word:"L'habit brodé",english:'Embroidered court coat',desktop:{point:[520,510],bend:[765,365],end:[895,365]},mobile:{point:[355,565],bend:[465,475],end:[505,475]}},
  {id:'lace',word:'Le jabot de dentelle',english:'Lace jabot',desktop:{point:[435,553],bend:[740,520],end:[895,520]},mobile:{point:[275,595],bend:[455,660],end:[505,660]}},
  {id:'breeches',word:'La culotte',english:'Knee breeches',desktop:{point:[435,660],bend:[760,675],end:[895,675]},mobile:{point:[275,700],bend:[465,845],end:[505,845]}},
]
const glints=[
  [140,230,1],[650,150,.8],[605,315,.55],[125,485,.65],[670,600,.9],[170,720,.8],[565,800,.6],[285,115,.4],[655,760,.4],
]

export default function OutfitDetail({hideCharacter=false,replay=0,showLearner=false}) {
  const reduced=useReducedMotion()
  const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:750px)').matches)
  useEffect(()=>{
    const query=window.matchMedia('(max-width:750px)')
    const change=event=>setMobile(event.matches)
    query.addEventListener('change',change)
    return()=>query.removeEventListener('change',change)
  },[])
  const rootRef=useRef(null)
  const learnerRef=useRef(null)
  useLayoutEffect(()=>{
    if(!showLearner||!learnerRef.current)return
    // Reserve the actual card height while the same diagram smoothly contracts.
    const measure=()=>rootRef.current?.style.setProperty('--learner-height',`${learnerRef.current.offsetHeight}px`)
    measure()
    const observer=new ResizeObserver(measure)
    observer.observe(learnerRef.current)
    return()=>observer.disconnect()
  },[showLearner])
  const active=!hideCharacter
  const hero=mobile?{x:20,y:250,width:470,height:564}:{x:140,y:130,width:540,height:690}
  return <motion.section ref={rootRef} className={`outfit-detail ${showLearner?'has-learner':''}`} aria-label="The winning Duo outfit and its French vocabulary" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.28}}>
    <header className="outfit-intro"><h2 className="outfit-heading">Advanced Vocabulary Challenges</h2><p className="outfit-subtitle">{showLearner?'Higher proficiency unlocks advanced outfits, while streaks and rankings motivate users to keep learning.':'Higher-level players can access more complex French clothing vocabulary.'}</p></header>
    <svg className="outfit-diagram" viewBox={mobile?'0 160 900 940':'0 100 1600 800'} role="img" aria-labelledby="outfit-title outfit-description">
      <title id="outfit-title">French clothing vocabulary</title>
      <desc id="outfit-description">Duo’s winning French outfit: a feathered tricorne, an embroidered coat, a lace jabot and breeches. {showLearner?'English translations appear below the French labels, followed by Emma’s learning profile.':'Four French labels appear in sequence.'}</desc>
      <ellipse cx={mobile?255:420} cy={mobile?810:790} rx={mobile?135:215} ry={mobile?15:17} fill="#e5e5e5" opacity=".55"/>
      <g className={`outfit-duo-idle ${active&&!reduced?'outfit-duo-breathing':''} ${!active?'outfit-duo-in-flight':''}`} style={{transformOrigin:`${mobile?250:410}px ${mobile?815:820}px`}}>
        <image className="outfit-duo-target" href="/duo-winning-outfit.png" {...hero} preserveAspectRatio="xMidYMid meet"/>
      </g>
      <g className="outfit-sparkles" aria-hidden="true">
        {glints.map(([x,y,size],index)=><g key={index} transform={`translate(${mobile?x*.6:x} ${mobile?y*1.08+35:y})`}><motion.g className="outfit-glint" initial={{opacity:0}} animate={!active?{opacity:0}:reduced?{opacity:.5,scale:size}:{opacity:[0,.9,0],scale:[size*.65,size*1.15,size*.65]}} transition={reduced?{duration:0}:{duration:2.2+index*.13,delay:index*.23,repeat:Infinity,ease:'easeInOut'}}><path d="M0-12Q2-2 12 0Q2 2 0 12Q-2 2-12 0Q-2-2 0-12Z" fill={index%3===0?'#fff':'#f8bd2b'}/><circle cx="18" cy="-19" r="2.5" fill="#edb526"/></motion.g></g>)}
      </g>
      {clothes.map((item,index)=>{
        const {point,bend,end}=mobile?item.mobile:item.desktop
        const delay=reduced?0:.2+index*.52
        return <g key={`${item.id}-${replay}`} className="outfit-annotation" data-clothing={item.id} lang="fr">
          <motion.path className="outfit-leader" d={`M${point.join(' ')}L${bend.join(' ')}H${end[0]}`} fill="none" stroke="#4c7eab" strokeWidth={mobile?2.3:2} strokeLinecap="round" strokeLinejoin="round" initial={reduced||showLearner?false:{pathLength:0,opacity:0}} animate={active?{pathLength:1,opacity:1}:{pathLength:0,opacity:0}} transition={{duration:reduced||showLearner?0:.42,delay:showLearner?0:delay}}/>
          <motion.circle cx={point[0]} cy={point[1]} r={mobile?5:5.5} fill="#fffdf5" stroke="#4c7eab" strokeWidth="2" initial={showLearner?false:{opacity:0}} animate={{opacity:active?1:0}} transition={{duration:reduced||showLearner?0:.15,delay:showLearner?0:delay}}/>
          <motion.text className="outfit-word" x={end[0]+(mobile?18:25)} y={end[1]} dominantBaseline="middle" initial={reduced||showLearner?false:{opacity:0,x:12}} animate={{opacity:active?1:0,x:0}} transition={{duration:reduced||showLearner?0:.35,delay:showLearner?0:delay+(reduced?0:.25)}}>{item.word}</motion.text>
          {showLearner&&<motion.g className="outfit-translation-pop" lang="en" initial={reduced?false:{opacity:0,y:8,scale:.95}} animate={{opacity:active?1:0,y:active?0:8,scale:active?1:.95}} transition={{duration:reduced?0:.38,delay:delay+(reduced?0:.4),type:'spring',bounce:.22}}><text className="outfit-translation" x={end[0]+(mobile?18:25)} y={end[1]+(mobile?57:44)}>{item.english}</text></motion.g>}
        </g>
      })}
    </svg>
    <div className="learner-slot" aria-hidden={!showLearner}>
      {showLearner&&<div ref={learnerRef} className="learner-content"><LearnerProgress active={active}/></div>}
    </div>
  </motion.section>
}
