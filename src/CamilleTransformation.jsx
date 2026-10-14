import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'

export default function CamilleTransformation({origin,onReveal,onComplete}) {
  const [scope,animate] = useAnimate()
  const callbacks=useRef({onReveal,onComplete})
  useEffect(()=>{callbacks.current={onReveal,onComplete}},[onReveal,onComplete])
  useEffect(()=>{
    let cancelled=false
    const controls=[]
    const move=async(target,values,options)=>{if(cancelled)return;const control=animate(target,values,options);controls.push(control);await control}
    const run=async()=>{
      await Promise.all([
        move('.transform-flash',{opacity:[0,.85,0],scale:[.5,1.15]},{duration:.38,ease:'easeOut'}),
        move('.transform-photo',{opacity:0},{delay:.1,duration:.16}),
        move('.transform-cartoon',{opacity:1},{delay:.14,duration:.16}),
      ])
      if(cancelled)return
      scope.current.dataset.phase='jump'
      await move('.camille-transform-actor',{y:-85,scale:1.2,rotate:5},{duration:.25,ease:'easeOut'})
      if(cancelled)return
      callbacks.current.onReveal()
      await move('.camille-transform-actor',{y:-110,rotate:0},{duration:.4,ease:'easeInOut'})
      if(cancelled)return
      let destination=document.querySelector('.adventure-character')
      while(!destination && !cancelled){await new Promise(requestAnimationFrame);destination=document.querySelector('.adventure-character')}
      if(cancelled)return
      const stage=destination.getBoundingClientRect()
      scope.current.dataset.phase='land'
      await move('.camille-transform-actor',{x:stage.left-origin.left,y:stage.top-origin.top,width:stage.width,height:stage.height,scale:1,rotate:0},{duration:.65,ease:[.32,0,.22,1]})
      if(!cancelled)callbacks.current.onComplete()
    }
    run()
    return()=>{cancelled=true;controls.forEach(control=>control.stop())}
  },[animate,origin,scope])
  return <div ref={scope} className="camille-transform" data-phase="flash" aria-hidden="true"><div className="camille-transform-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height}}><img className="transform-photo" src="/camille-portrait.png" alt=""/><img className="transform-cartoon" src="/camille-cartoon.png" alt=""/><div className="transform-flash"/></div></div>
}
