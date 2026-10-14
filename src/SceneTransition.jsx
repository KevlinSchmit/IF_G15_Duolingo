import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import FrenchDuo from './FrenchDuo'
import './SceneTransition.css'

export default function SceneTransition({ origin, onImpact, onReveal, onComplete }) {
  const [scope, animate] = useAnimate()
  const callbacks = useRef({onImpact,onReveal,onComplete})
  useEffect(() => {callbacks.current = {onImpact,onReveal,onComplete}}, [onImpact,onReveal,onComplete])
  useEffect(() => {
    let cancelled = false
    const controls = []
    const move = async (target, values, options) => {
      if (cancelled) return
      const control = animate(target,values,options)
      controls.push(control)
      await control
    }
    const run = async () => {
      const width = Math.min(innerWidth * .84, innerHeight * .82)
      const scale = width / origin.width
      const centerX = (innerWidth - origin.width) / 2 - origin.left
      const centerY = (innerHeight - origin.height) / 2 - origin.top
      await move('.transition-actor',{y:[0,-75,0],rotate:[0,-7,0]},{duration:.55,ease:'easeInOut'})
      if(cancelled) return
      scope.current.dataset.phase = 'approach'
      await move('.transition-actor',{x:centerX,y:centerY,scale},{duration:1.25,ease:[.22,.75,.25,1]})
      if(cancelled) return
      scope.current.dataset.phase = 'swing'
      await move('.duo-baguette',{rotate:-105,scale:1.12},{duration:.45,ease:'easeInOut'})
      await move('.duo-baguette',{rotate:80,scale:1.6},{duration:.28,ease:'easeIn'})
      if(cancelled) return
      callbacks.current.onImpact()
      scope.current.dataset.phase = 'impact'
      await Promise.all([
        move('.transition-actor',{x:[centerX,centerX-14,centerX+12,centerX],y:[centerY,centerY+16,centerY-8,centerY]},{duration:.32}),
        move('.impact-ring',{opacity:[0,.9,0],scale:[.2,2.5]},{duration:.65,ease:'easeOut'}),
      ])
      if(cancelled) return
      callbacks.current.onReveal()
      await move('.duo-baguette',{rotate:0,scale:1},{duration:.35,ease:'easeOut'})
      await move('.transition-actor',{scale:.5,x:innerWidth*.72-origin.left-origin.width/2,y:innerHeight*.74-origin.top-origin.height/2},{duration:1,ease:'easeInOut'})
      if(cancelled) return
      scope.current.dataset.phase = 'exit'
      await move('.transition-actor',{x:innerWidth+origin.width-origin.left,scale:.42},{duration:1.6,ease:'linear'})
      if(!cancelled) callbacks.current.onComplete()
    }
    run()
    return () => {cancelled=true;controls.forEach(control=>control.stop())}
  }, [animate,origin,scope])
  return <div ref={scope} className="scene-transition" data-phase="jump" aria-hidden="true">
    <div className="impact-ring"/>
    <div className="transition-actor" style={{left:origin.left,top:origin.top,width:origin.width}}><FrenchDuo cinematic/></div>
  </div>
}
