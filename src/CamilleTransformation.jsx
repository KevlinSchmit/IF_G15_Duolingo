import { useEffect, useRef } from 'react'
import { animate as animateValue, useAnimate } from 'motion/react'
import CamilleIdle from './CamilleIdle'
import { useSoundScope } from './audio/useSoundEffects'

const portraitView=[210,70,640,640]
const fullBodyView=[0,0,1024,1490]
const ease=[.22,.7,.2,1]

export default function CamilleTransformation({origin,portraitRef,onReveal,onComplete}) {
  const [scope,animate]=useAnimate()
  const sound=useSoundScope(true)
  const callbacks=useRef({onReveal,onComplete})
  useEffect(()=>{callbacks.current={onReveal,onComplete}},[onReveal,onComplete])
  useEffect(()=>{
    let cancelled=false
    const controls=[]
    const pauses=[]
    const portrait=portraitRef.current
    const local=selector=>portrait.querySelector(selector)
    const puppet=local('.portrait-puppet')
    const source=puppet.querySelector('svg')
    const move=async(target,values,options)=>{
      if(cancelled)return
      const control=animate(target,values,options)
      controls.push(control)
      await control
    }
    const phase=name=>{if(!cancelled)scope.current.dataset.phase=name}
    const pause=milliseconds=>new Promise(resolve=>{
      const timer=setTimeout(resolve,milliseconds)
      pauses.push(()=>{clearTimeout(timer);resolve()})
    })
    const run=async()=>{
      // Decode before the flash so the first cartoon frame is fully drawn.
      const image=new Image()
      image.src='/camille-animation-body.png'
      await image.decode().catch(()=>{})
      if(cancelled)return
      sound('camera')
      await Promise.all([
        move(local('.portrait-flash'),{opacity:[0,1,1,0]},{duration:.28,times:[0,.25,.42,1]}),
        move(puppet,{opacity:1},{delay:.09,duration:.12}),
        move(local('.portrait-real'),{opacity:0},{delay:.1,duration:.1}),
      ])
      if(cancelled)return
      // A readable open-eyed portrait precedes the blink, in the original frame.
      phase('portrait')
      await pause(200)
      if(cancelled)return
      phase('blink')
      await move(puppet.querySelectorAll('.camille-blink-curtain'),{scaleY:[0,1,1,0]},{duration:.3,times:[0,.38,.56,1],ease:'easeInOut'})
      if(cancelled)return
      phase('fullbody')
      sound('morph',{volume:.8})
      // Pull back the camera on this same SVG; no second portrait or crossfade.
      const camera=animateValue(0,1,{
        duration:.32,ease,
        onUpdate:progress=>source.setAttribute('viewBox',portraitView.map((value,index)=>value+(fullBodyView[index]-value)*progress).join(' ')),
      })
      controls.push(camera)
      await camera
      if(cancelled)return
      await pause(40)
      if(cancelled)return
      phase('jump')
      sound('jump',{volume:.75})
      // Match the original window's unrotated dimensions and its -5° angle.
      // Both renders now have the same camera and pose, so this handoff is invisible.
      const actor=scope.current.querySelector('.camille-transform-actor')
      actor.style.opacity='1'
      puppet.style.opacity='0'
      await move(actor,{y:-26,scale:1.045,rotate:-2},{duration:.14,ease})
      if(cancelled)return
      callbacks.current.onReveal()
      let destination=document.querySelector('.adventure-character')
      while(!destination&&!cancelled){await new Promise(requestAnimationFrame);destination=document.querySelector('.adventure-character')}
      if(cancelled)return
      const stage=destination.getBoundingClientRect()
      phase('land')
      await move(actor,{x:stage.left-origin.left,y:stage.top-origin.top,width:stage.width,height:stage.height,scale:1,rotate:0},{duration:.3,ease:[.32,0,.22,1]})
      if(cancelled)return
      sound('land',{volume:.7})
      await move(actor,{scaleY:[1,.98,1],y:[stage.top-origin.top,stage.top-origin.top+3,stage.top-origin.top]},{duration:.1})
      if(!cancelled)callbacks.current.onComplete()
    }
    run()
    return()=>{
      cancelled=true
      controls.forEach(control=>control.stop())
      pauses.forEach(cancel=>cancel())
      if(portrait.isConnected){
        source.setAttribute('viewBox',portraitView.join(' '))
        puppet.style.opacity='0'
        local('.portrait-real').style.opacity='1'
        local('.portrait-flash').style.opacity='0'
      }
    }
  },[animate,origin,portraitRef,scope,sound])
  return <div ref={scope} className="camille-transform" data-phase="flash" aria-hidden="true"><div className="camille-transform-actor" style={{left:origin.left,top:origin.top,width:origin.width,height:origin.height,opacity:0,transform:`rotate(${origin.rotate}deg)`}}><CamilleIdle active={false}/></div></div>
}
