import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import './OutfitDetail.css'

export default function OutfitZoom({origin,onComplete}) {
  const [scope,animate]=useAnimate()
  const complete=useRef(onComplete)
  useEffect(()=>{complete.current=onComplete},[onComplete])
  useEffect(()=>{
    let cancelled=false,control
    const run=async()=>{
      const artwork=new Image()
      artwork.src='/duo-winning-outfit.png'
      try{await artwork.decode()}catch{if(!cancelled)complete.current();return}
      if(cancelled)return
      control=animate('.outfit-zoom-actor',{opacity:1},{duration:.1})
      await control
      let target=document.querySelector('.outfit-duo-target')
      while(!target&&!cancelled){await new Promise(requestAnimationFrame);target=document.querySelector('.outfit-duo-target')}
      if(cancelled)return
      const end=target.getBoundingClientRect()
      control=animate('.outfit-zoom-actor',{left:end.left,top:end.top,width:end.width,height:end.height,opacity:1},{duration:.82,ease:[.22,.7,.2,1]})
      await control
      if(!cancelled)complete.current()
    }
    run()
    return()=>{cancelled=true;control?.stop()}
  },[animate,scope,origin])
  return <div ref={scope} className="outfit-zoom" aria-hidden="true"><img className="outfit-zoom-actor" src="/duo-winning-outfit.png" alt="" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height,opacity:0}}/></div>
}
