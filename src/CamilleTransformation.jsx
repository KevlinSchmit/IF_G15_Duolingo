import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'

export default function CamilleTransformation({origin,portraitRef,onReveal,onComplete}) {
  const [scope,animate] = useAnimate()
  const callbacks=useRef({onReveal,onComplete})
  useEffect(()=>{callbacks.current={onReveal,onComplete}},[onReveal,onComplete])
  useEffect(()=>{
    let cancelled=false
    const controls=[]
    const portrait=portraitRef.current
    const local=selector=>portrait.querySelector(selector)
    const move=async(target,values,options)=>{
      if(cancelled)return
      const control=animate(target,values,options)
      controls.push(control)
      await control
    }
    const phase=name=>{if(!cancelled)scope.current.dataset.phase=name}
    const run=async()=>{
      // All shoulder portraits and the flash live inside the original photo window.
      await Promise.all([
        move(local('.portrait-flash'),{opacity:[0,1,1,0]},{duration:.42,times:[0,.25,.45,1]}),
        move(local('.portrait-neutral'),{opacity:1},{delay:.12,duration:.1}),
        move(local('.portrait-real'),{opacity:0},{delay:.2,duration:.08}),
      ])
      if(cancelled)return
      phase('portrait')
      await move(local('.portrait-neutral'),{scale:[1,1.025,1],rotate:[0,-1,0]},{duration:.32,ease:'easeInOut'})
      phase('expression')
      // An amused wink, a small head tilt, then a smile before the jump.
      await move(local('.portrait-wink'),{opacity:1},{duration:.18})
      await move(local('.portrait-wink'),{rotate:[0,3,-1,0],y:[0,-4,0,0]},{duration:.48,ease:'easeInOut'})
      await move(local('.portrait-wink'),{opacity:0},{duration:.18})
      await move(local('.portrait-neutral'),{y:[0,5,0],scale:[1,.98,1.02]},{duration:.22,ease:'easeInOut'})
      if(cancelled)return
      phase('jump')
      await Promise.all([
        move(local('.portrait-neutral'),{opacity:0},{duration:.12}),
        move('.camille-transform-actor',{opacity:1,y:-85,height:origin.height*1.55,scale:1.04,rotate:4},{duration:.3,ease:[.2,.7,.25,1]}),
      ])
      if(cancelled)return
      callbacks.current.onReveal()
      await move('.camille-transform-actor',{y:-110,rotate:0},{duration:.38,ease:'easeInOut'})
      let destination=document.querySelector('.adventure-character')
      while(!destination&&!cancelled){await new Promise(requestAnimationFrame);destination=document.querySelector('.adventure-character')}
      if(cancelled)return
      const stage=destination.getBoundingClientRect()
      phase('land')
      await move('.camille-transform-actor',{x:stage.left-origin.left,y:stage.top-origin.top,width:stage.width,height:stage.height,scale:1,rotate:0},{duration:.55,ease:[.32,0,.22,1]})
      await move('.camille-transform-actor',{scaleY:[1,.96,1],y:[stage.top-origin.top,stage.top-origin.top+3,stage.top-origin.top]},{duration:.16})
      if(!cancelled)callbacks.current.onComplete()
    }
    run()
    return()=>{cancelled=true;controls.forEach(control=>control.stop())}
  },[animate,origin,portraitRef,scope])
  return <div ref={scope} className="camille-transform" data-phase="flash" aria-hidden="true"><div className="camille-transform-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height,opacity:0}}><img className="transform-fullbody" src="/camille-idle-wink.png" alt=""/></div></div>
}
