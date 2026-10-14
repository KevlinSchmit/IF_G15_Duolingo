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
    const phase=name=>{if(!cancelled)scope.current.dataset.phase=name}
    const run=async()=>{
      // A single camera flash hides the photographic-to-cartoon swap.
      await Promise.all([
        move('.transform-flash',{opacity:[0,.88,0],scale:[.7,1.12]},{duration:.34,ease:'easeOut'}),
        move('.transform-photo',{opacity:0},{delay:.1,duration:.12}),
        move('.transform-face-neutral',{opacity:1},{delay:.12,duration:.12}),
      ])
      if(cancelled)return
      phase('portrait')
      await move('.transform-frame',{scale:[1,1.015,1]},{duration:.25,ease:'easeInOut'})
      if(cancelled)return
      phase('expression')
      await Promise.all([
        move('.transform-face-neutral',{opacity:0},{duration:.12}),
        move('.transform-face-wink',{opacity:1},{duration:.12}),
      ])
      await move('.transform-frame',{rotate:[0,2,0]},{duration:.28,ease:'easeInOut'})
      if(cancelled)return
      phase('jump')
      await Promise.all([
        move('.transform-frame',{opacity:0},{duration:.12}),
        move('.transform-fullbody',{opacity:1},{duration:.12}),
        move('.camille-transform-actor',{y:-85,height:origin.height*1.2,scale:1.08,rotate:5},{duration:.25,ease:'easeOut'}),
      ])
      if(cancelled)return
      callbacks.current.onReveal()
      await move('.camille-transform-actor',{y:-110,rotate:0},{duration:.38,ease:'easeInOut'})
      let destination=document.querySelector('.adventure-character')
      while(!destination&&!cancelled){await new Promise(requestAnimationFrame);destination=document.querySelector('.adventure-character')}
      if(cancelled)return
      const stage=destination.getBoundingClientRect()
      phase('land')
      await move('.camille-transform-actor',{x:stage.left-origin.left,y:stage.top-origin.top,width:stage.width,height:stage.height,scale:1,rotate:0},{duration:.48,ease:[.32,0,.22,1]})
      if(!cancelled)callbacks.current.onComplete()
    }
    run()
    return()=>{cancelled=true;controls.forEach(control=>control.stop())}
  },[animate,origin,scope])
  return <div ref={scope} className="camille-transform" data-phase="flash" aria-hidden="true"><div className="camille-transform-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height}}><div className="transform-frame"><img className="transform-photo" src="/camille-portrait.png" alt=""/><img className="transform-face-neutral" src="/camille-cartoon-portrait.png" alt=""/><img className="transform-face-wink" src="/camille-cartoon-portrait-wink.png" alt=""/><div className="transform-flash"/></div><img className="transform-fullbody" src="/camille-idle-wink.png" alt=""/></div></div>
}
