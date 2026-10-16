import { useEffect, useRef, useState } from 'react'
import { useAnimate } from 'motion/react'
import './OutfitDetail.css'

export default function OutfitZoom({origin,onReveal,onComplete}) {
  const [scope,animate]=useAnimate()
  const [phase,setPhase]=useState('highlight')
  const reveal=useRef(onReveal)
  const complete=useRef(onComplete)
  useEffect(()=>{reveal.current=onReveal},[onReveal])
  useEffect(()=>{complete.current=onComplete},[onComplete])
  useEffect(()=>{
    let cancelled=false,control
    const run=async()=>{
      const artwork=new Image()
      artwork.src='/duo-winning-outfit.png'
      try{await artwork.decode()}catch{if(!cancelled){reveal.current();complete.current()}return}
      if(cancelled)return
      // Emphasize the actual winner while slide 14 is still visible, then
      // reveal the outfit page and fly the artwork out of that same position.
      control=animate('.outfit-winner-highlight',{opacity:[0,1,0],scale:[.96,1.03,1]},{duration:.28,times:[0,.5,1],ease:'easeInOut'})
      await control
      if(cancelled)return
      setPhase('zoom')
      reveal.current()
      control=animate('.outfit-zoom-actor',{opacity:1},{duration:.06})
      await control
      let target=document.querySelector('.outfit-duo-target')
      while(!target&&!cancelled){await new Promise(requestAnimationFrame);target=document.querySelector('.outfit-duo-target')}
      if(cancelled)return
      const end=target.getBoundingClientRect()
      control=animate('.outfit-zoom-actor',{left:end.left,top:end.top,width:end.width,height:end.height,opacity:1},{duration:.68,ease:[.22,.7,.2,1]})
      await control
      if(!cancelled)complete.current()
    }
    run()
    return()=>{cancelled=true;control?.stop()}
  },[animate,scope,origin])
  return <div ref={scope} className="outfit-zoom" data-phase={phase} aria-hidden="true"><div className="outfit-winner-highlight" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height,opacity:0}}><span>✦</span><span>✦</span><span>✧</span></div><img className="outfit-zoom-actor" src="/duo-winning-outfit.png" alt="" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height,opacity:0}}/></div>
}
