import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import CamilleIdle from './CamilleIdle'

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
        move(local('.portrait-flash'),{opacity:[0,1,1,0]},{duration:.2,times:[0,.25,.45,1]}),
        move(local('.portrait-neutral'),{opacity:1},{delay:.06,duration:.04}),
        move(local('.portrait-real'),{opacity:0},{delay:.09,duration:.04}),
        // The first visible cartoon portrait is already blinking in the same frame.
        move(local('.portrait-wink'),{opacity:1},{delay:.06,duration:.04}),
      ])
      if(cancelled)return
      phase('expression')
      await move(local('.portrait-wink'),{opacity:0},{duration:.08})
      if(cancelled)return
      phase('jump')
      await Promise.all([
        move(local('.portrait-neutral'),{opacity:0},{duration:.1}),
        move('.camille-transform-actor',{opacity:1,y:-45,height:origin.height*1.55,scale:1.02,rotate:2},{duration:.18,ease:[.2,.7,.25,1]}),
      ])
      if(cancelled)return
      callbacks.current.onReveal()
      let destination=document.querySelector('.adventure-character')
      while(!destination&&!cancelled){await new Promise(requestAnimationFrame);destination=document.querySelector('.adventure-character')}
      if(cancelled)return
      const stage=destination.getBoundingClientRect()
      phase('land')
      await move('.camille-transform-actor',{x:stage.left-origin.left,y:stage.top-origin.top,width:stage.width,height:stage.height,scale:1,rotate:0},{duration:.36,ease:[.32,0,.22,1]})
      await move('.camille-transform-actor',{scaleY:[1,.97,1],y:[stage.top-origin.top,stage.top-origin.top+3,stage.top-origin.top]},{duration:.1})
      if(!cancelled)callbacks.current.onComplete()
    }
    run()
    return()=>{cancelled=true;controls.forEach(control=>control.stop())}
  },[animate,origin,portraitRef,scope])
  return <div ref={scope} className="camille-transform" data-phase="flash" aria-hidden="true"><div className="camille-transform-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height,opacity:0}}><CamilleIdle active={false}/></div></div>
}
