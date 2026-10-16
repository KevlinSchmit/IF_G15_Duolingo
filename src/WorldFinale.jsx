import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useSoundScope } from './audio/useSoundEffects'
import WorldLandmark from './WorldLandmarks'
import { cities, finaleTiming as timing, projectCity, wardrobe } from './worldFinaleSequence'
import './WorldFinale.css'

const ease=[.22,.7,.2,1]
const destination=projectCity(116.4074,39.9042)
const destinationPosition={left:`${destination[0]/16}%`,top:`${destination[1]/9.6}%`}

export default function WorldFinale({origin=null}) {
  const reduced=useReducedMotion()
  const sound=useSoundScope()
  const canvas=useRef(null),probe=useRef(null)
  const available=useRef(new Set([0]))
  const [arrival,setArrival]=useState(null)
  const [costume,setCostume]=useState(0)
  const [dressing,setDressing]=useState(false)
  const [phase,setPhase]=useState('wardrobe')
  const [litCities,setLitCities]=useState(0)
  const [title,setTitle]=useState(false)
  const [ready,setReady]=useState(false)
  useLayoutEffect(()=>{
    const rect=canvas.current.getBoundingClientRect(),hero=probe.current.getBoundingClientRect()
    setArrival(origin?{left:`${(origin.left+origin.width/2-rect.left)/rect.width*100}%`,top:`${(origin.top+origin.height/2-rect.top)/rect.height*100}%`,scale:origin.width/hero.width}:{left:'50%',top:'50%',scale:1})
  },[origin])
  useEffect(()=>{
    let cancelled=false
    Promise.all([...wardrobe.map((outfit,index)=>({src:outfit.src,index})),{src:'/world-finale/world-land.svg'}].map(async asset=>{
      const image=new Image();image.src=asset.src
      try{await image.decode();if(asset.index!==undefined)available.current.add(asset.index)}catch{/* Keep the already visible costume if an image cannot decode. */}
    })).then(()=>{if(!cancelled)setReady(true)})
    return()=>{cancelled=true}
  },[])
  useEffect(()=>{
    if(!ready)return
    const timers=[]
    const at=(seconds,action)=>timers.push(setTimeout(action,seconds*1000))
    wardrobe.slice(1).forEach((outfit,index)=>{
      const start=timing.firstChange+index*timing.outfitInterval
      at(start,()=>{setDressing(true);sound('morph',{volume:.48,pitch:1+index*.035})})
      at(start+timing.costumeSwap,()=>{if(available.current.has(index+1))setCostume(index+1)})
      at(start+timing.dressingDuration,()=>setDressing(false))
    })
    at(timing.pullback,()=>{setPhase('pullback');sound('whoosh',{volume:.45})})
    cities.forEach((city,index)=>at(timing.cityStart+index*timing.cityInterval,()=>{
      setPhase('cities');setLitCities(index+1);sound('label',{volume:.55,pitch:1+index*.08})
    }))
    at(timing.title,()=>{setTitle(true);sound('sparkle',{volume:.8})})
    at(timing.complete,()=>setPhase('complete'))
    return()=>timers.forEach(clearTimeout)
  },[ready,sound])
  const mapVisible=phase!=='wardrobe'
  const actorAnimation=mapVisible?{
    left:['50%','56%',destinationPosition.left,destinationPosition.left],
    top:['50%','46%',destinationPosition.top,destinationPosition.top],
    scale:[1,.67,.1,.035],opacity:[1,1,.9,0],rotate:[0,-3,1,0],
  }:{left:'50%',top:'50%',scale:1,opacity:1,rotate:0}
  return <section className="world-finale" aria-label="Duo’s world fashion journey" data-phase={phase} data-costume={wardrobe[costume].id} data-lit-cities={litCities}>
    <div className="finale-canvas" ref={canvas}>
      <motion.svg className="finale-world-map" viewBox="0 0 1600 960" role="img" aria-label="World map with Paris, Tokyo, Seoul, Rome, Beijing and Madrid" initial={{opacity:0,scale:1.16}} animate={{opacity:mapVisible?1:0,scale:mapVisible?1:1.16}} transition={{duration:reduced?0:2.4,ease}} style={{transformOrigin:'78% 40%'}}>
        <defs><radialGradient id="finale-ocean"><stop stopColor="#eaf7fc"/><stop offset="1" stopColor="#f5fbfd"/></radialGradient></defs>
        <ellipse cx="800" cy="491" rx="775" ry="350" fill="url(#finale-ocean)"/>
        <g className="finale-graticule" stroke="#cee5eb" opacity=".45" fill="none" strokeWidth="1.2">
          {[290,415,540,665].map(y=><path key={y} d={`M85 ${y}H1515`}/>)}
          {[330,565,800,1035,1270].map(x=><path key={x} d={`M${x} 200Q${x-70} 490 ${x} 798`}/>)}
        </g>
        <image className="finale-continents" href="/world-finale/world-land.svg" width="1600" height="960"/>
        {cities.map((city,index)=>{
          const [x,y]=projectCity(...city.coordinates),[lx,ly]=city.label,lit=index<litCities
          const labelBottom=ly+93,above=labelBottom<y
          return <g key={city.id} className="finale-city" data-city={city.id} data-lit={lit}>
            <motion.path d={`M${x} ${y}Q${lx} ${y} ${lx} ${above?labelBottom-3:ly-18}`} fill="none" stroke={city.color} strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" initial={{pathLength:0,opacity:0}} animate={{pathLength:lit?1:0,opacity:lit?.65:0}} transition={{duration:reduced?0:.65,ease}}/>
            <motion.circle cx={x} cy={y} r="18" fill={city.color} initial={{opacity:0,scale:.5}} animate={{opacity:lit?.15:0,scale:lit?1:.5}} style={{transformOrigin:`${x}px ${y}px`}} transition={{duration:reduced?0:.55}}/>
            <motion.circle cx={x} cy={y} r="7" fill={city.color} stroke="white" strokeWidth="3" initial={{opacity:0,scale:0}} animate={{opacity:lit?1:0,scale:lit?1:0}} style={{transformOrigin:`${x}px ${y}px`}} transition={{duration:reduced?0:.45,type:'spring',bounce:.25}}/>
            <motion.g initial={{opacity:0,y:reduced?0:12,scale:reduced?1:.85}} animate={{opacity:lit?1:0,y:lit?0:12,scale:lit?1:.85}} transition={{duration:reduced?0:.6,type:'spring',bounce:.18}} style={{transformOrigin:`${lx}px ${ly+60}px`}}>
              <ellipse cx={lx} cy={ly+36} rx="81" ry="83" fill="white" opacity=".76"/>
              <g transform={`translate(${lx-62} ${ly-49}) scale(1.03)`}><WorldLandmark city={city.id}/></g>
              <text className="finale-city-name" x={lx} y={ly+105} fill={city.color} textAnchor="middle">{city.name}</text>
            </motion.g>
          </g>
        })}
      </motion.svg>
      <div ref={probe} className="finale-actor-size" aria-hidden="true"/>
      {arrival&&<motion.div className="finale-actor" initial={{...arrival,opacity:1}} animate={reduced?(mapVisible?{...destinationPosition,scale:.06,opacity:0}:{left:'50%',top:'50%',scale:1,opacity:1}):actorAnimation} transition={{duration:reduced?0:mapVisible?3.15:.72,ease:mapVisible?'easeInOut':ease,times:mapVisible?[0,.3,.82,1]:undefined}}>
        <motion.div className="finale-ground" initial={{opacity:0}} animate={{opacity:mapVisible?0:1}} transition={{duration:.4}}/>
        <motion.div className="finale-dressing-body" animate={reduced||mapVisible?{rotate:0,y:0,scaleX:1,scaleY:1}:dressing?{rotate:[0,-8,10,-3,0],y:[0,13,-15,5,0],scaleX:[1,.82,.9,1.02,1],scaleY:[1,.94,1.03,.99,1]}:{rotate:[0,.7,0,-.7,0],y:[0,-4,0,-2,0],scaleX:1,scaleY:1}} transition={reduced||mapVisible?{duration:0}:dressing?{duration:timing.dressingDuration,ease:'easeInOut'}:{duration:3.5,repeat:Infinity,ease:'easeInOut'}}>
          <AnimatePresence initial={false}>
            <motion.img className="finale-costume" key={wardrobe[costume].id} src={wardrobe[costume].src} alt={wardrobe[costume].alt} draggable="false" initial={{opacity:0,y:reduced?0:10,scale:reduced?1:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:reduced?0:-7,scale:reduced?1:.98}} transition={{duration:reduced?0:.2,ease:'easeOut'}}/>
          </AnimatePresence>
        </motion.div>
        <motion.svg className="finale-dressing-streaks" viewBox="0 0 500 600" aria-hidden="true" initial={{opacity:0}} animate={{opacity:!reduced&&dressing?[0,.85,0]:0,rotate:dressing?[0,9,0]:0}} transition={{duration:timing.dressingDuration,times:[0,.4,1]}}>
          <path d="M57 290Q20 230 56 178M435 352q38 38 19 79" fill="none" stroke="#edc46c" strokeWidth="5" strokeLinecap="round"/>
          <path d="m49 161 4 13 13 4-13 4-4 13-4-13-13-4 13-4 4-13Zm402 264 3 10 10 3-10 3-3 10-3-10-10-3 10-3 3-10Z" fill="#f5cb5b"/>
        </motion.svg>
      </motion.div>}
    </div>
    <motion.h2 className="finale-title" aria-hidden={!title} initial={{opacity:0,y:reduced?0:18,scale:reduced?1:.95}} animate={{opacity:title?1:0,y:title?0:18,scale:title?1:.95}} transition={{duration:reduced?0:.8,type:'spring',bounce:.16}}>From Paris to <span>World</span></motion.h2>
    <span className="finale-screenreader" aria-live="polite">{title?'From Paris to World':mapVisible?'Duo travels into China. Cities around the world light up.':wardrobe[costume].alt}</span>
  </section>
}
