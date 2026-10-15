import { useEffect, useRef } from 'react'

const radians=degrees=>degrees*Math.PI/180
const direction=angle=>[-Math.sin(radians(angle)),Math.cos(radians(angle))]
const point=([x,y])=>`${x.toFixed(2)} ${y.toFixed(2)}`

// A single tapered fabric outline bends with the arm. There are no overlapping
// elbow pieces or rotating circular shoulder caps to expose as the pose changes.
function sleeve([shoulder,elbow,wrist]) {
  const upper=direction(shoulder),lower=direction(shoulder+elbow)
  const end=[upper[0]*180+lower[0]*141,upper[1]*180+lower[1]*141]
  const controlA=upper.map(value=>value*171)
  const controlB=end.map((value,index)=>value-lower[index]*134)
  const left=[],right=[]
  for(let step=0;step<=24;step++){
    const t=step/24,u=1-t
    const center=end.map((value,index)=>3*u*u*t*controlA[index]+3*u*t*t*controlB[index]+t*t*t*value)
    const tangent=end.map((value,index)=>3*u*u*controlA[index]+6*u*t*(controlB[index]-controlA[index])+3*t*t*(value-controlB[index]))
    const length=Math.hypot(...tangent)||1
    const normal=[-tangent[1]/length,tangent[0]/length]
    const width=43-9*t*t
    left.push(center.map((value,index)=>value+normal[index]*width))
    right.push(center.map((value,index)=>value-normal[index]*width))
  }
  const edge=points=>points.slice(1).map((end,index)=>{
    const start=points[index],before=points[Math.max(0,index-1)],after=points[Math.min(points.length-1,index+2)]
    return `C${point(start.map((value,axis)=>value+(end[axis]-before[axis])/6))} ${point(end.map((value,axis)=>value-(after[axis]-start[axis])/6))} ${point(end)}`
  }).join(' ')
  const reversed=[...right].reverse()
  return {
    path:`M${point(left[0])} ${edge(left)} C${point(left.at(-1).map((value,index)=>value+lower[index]*12))} ${point(reversed[0].map((value,index)=>value+lower[index]*12))} ${point(reversed[0])} ${edge(reversed)} C${point(right[0].map((value,index)=>value-upper[index]*57))} ${point(left[0].map((value,index)=>value-upper[index]*57))} ${point(left[0])}Z`,
    hand:`translate(${point(end)}) rotate(${shoulder+elbow+wrist})`,
  }
}

function poseAt(routine,side,time) {
  const phase=(time%14)/14
  const next=routine.findIndex(frame=>frame.time>phase)
  const end=routine[next<0?routine.length-1:next],start=routine[Math.max(0,next-1)]
  const progress=(phase-start.time)/(end.time-start.time||1)
  const eased=progress*progress*(3-2*progress)
  return start[side].map((value,index)=>value+(end[side][index]-value)*eased)
}

export default function CamilleArm({side,id,moving,routine}) {
  const ref=useRef(null)
  const first=sleeve(routine[0][side])
  useEffect(()=>{
    const arm=ref.current
    const fabric=arm.querySelector('.camille-sleeve'),hand=arm.querySelector('.camille-hand')
    const draw=pose=>{
      const shape=sleeve(pose)
      fabric.setAttribute('d',shape.path)
      hand.setAttribute('transform',shape.hand)
    }
    draw(routine[0][side])
    if(!moving)return
    const root=arm.ownerSVGElement
    const timeline=root.querySelector('.camille-body-lift > animateTransform')
    const start=timeline?.getStartTime()??root.getCurrentTime()
    let frame
    const tick=()=>{
      draw(poseAt(routine,side,Math.max(0,root.getCurrentTime()-start)))
      frame=requestAnimationFrame(tick)
    }
    frame=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(frame)
  },[moving,routine,side])
  return <g ref={ref} className={`camille-arm camille-arm-${side}`} transform={`translate(${side==='left'?'450':'615'} 600)`}>
    <g className="camille-hand" transform={first.hand}>
      <path d="M-29-16C-34-5-33 15-28 32C-24 49-8 60 8 57C28 55 43 39 43 24C43 14 35 12 30 20L29-12Q0-24-29-16Z" fill={`url(#${id}-hand)`}/>
      <path d="M29 23q-8 4-11 13" fill="none" stroke="#e9b582" strokeWidth="3" strokeLinecap="round" opacity=".35"/>
    </g>
    <path className="camille-sleeve" d={first.path} fill={`url(#${id}-sleeve)`}/>
  </g>
}
