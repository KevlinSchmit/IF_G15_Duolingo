import { useEffect, useId } from 'react'
import { animate, motion, useIsPresent, useMotionValue, useTransform } from 'motion/react'

const TAU=Math.PI*2
const leftPivot=[188,315],rightPivot=[452,315]
const rotatePoint=([x,y],[px,py],degrees)=>{
  const radians=degrees*Math.PI/180,c=Math.cos(radians),s=Math.sin(radians)
  return [px+(x-px)*c-(y-py)*s,py+(x-px)*s+(y-py)*c]
}
const grips=(phase,reduced)=>({
  left:rotatePoint([110,197],leftPivot,reduced?0:Math.sin(phase*2)*18),
  right:rotatePoint([530,197],rightPivot,reduced?0:-Math.sin(phase*2)*22),
})
const cloth=({left:[lx,ly],right:[rx,ry]})=>`M${lx} ${ly}C${lx+64} ${ly+87} 244 306 320 300C396 306 ${rx-64} ${ry+87} ${rx} ${ry}L${rx-22} ${ry+187}C440 463 200 463 ${lx+22} ${ly+187}Z`
const tail=([x,y],side,phase)=>{
  const drift=Math.sin(phase*2+.7)*12,sign=side==='left'?-1:1
  return `M${x} ${y}C${x-sign*15} ${y+70} ${x+sign*26+drift} ${y+119} ${x+sign*70+drift} ${y+171}Q${x+sign*82+drift} ${y+193} ${x+sign*62+drift} ${y+202}L${x+sign*11+drift} ${y+224}Q${x-sign*6+drift} ${y+232} ${x-sign*14+drift} ${y+214}L${x-sign*40} ${y+158}Z`
}
const jumpTimes=[0,.08,.14,.22,.29,.34,.48,.55,.62,.70,.77,.84,1]

export default function ThankYouDuo({reduced}) {
  const id=useId().replaceAll(':',''),present=useIsPresent()
  const phase=useMotionValue(0)
  useEffect(()=>{
    if(reduced||!present){phase.set(0);return}
    const control=animate(phase,TAU,{duration:5.8,ease:'linear',repeat:Infinity})
    return()=>control.stop()
  },[phase,reduced,present])
  const leftAngle=useTransform(phase,value=>reduced?0:Math.sin(value*2)*18)
  const rightAngle=useTransform(phase,value=>reduced?0:-Math.sin(value*2)*22)
  const flagPath=useTransform(phase,value=>cloth(grips(value,reduced)))
  const leftTail=useTransform(phase,value=>tail(grips(value,reduced).left,'left',reduced?0:value))
  const rightTail=useTransform(phase,value=>tail(grips(value,reduced).right,'right',reduced?0:value))
  const foldPath=useTransform(phase,value=>{
    const {left:[lx,ly],right:[rx,ry]}=grips(value,reduced)
    return `M${lx+20} ${ly+56}C230 370 410 370 ${rx-20} ${ry+56}C425 428 215 428 ${lx+20} ${ly+56}Z`
  })
  const active=!reduced&&present
  return <svg className="thank-you-character" viewBox="0 0 640 640" role="img" aria-label="French Duo jumping and waving a blue, white and red flag">
    <defs><clipPath id={`${id}-flag`} clipPathUnits="userSpaceOnUse"><motion.path className="thank-you-flag-shape" d={flagPath}/></clipPath></defs>
    <g transform="translate(0 30)">
      <motion.ellipse className="thank-you-duo-shadow" cx="320" cy="586" rx="130" ry="11" fill="#bcc8b0" style={{originX:'320px',originY:'586px',transformBox:'view-box'}} animate={active?{scaleX:[1,1.06,.7,.86,1.1,1,1,1.07,.59,.8,1.1,1,1],opacity:[.42,.44,.2,.28,.46,.42,.42,.46,.16,.24,.46,.42,.42]}:{scaleX:1,opacity:.42}} transition={active?{duration:8.4,times:jumpTimes,repeat:Infinity,ease:'easeInOut'}:{duration:0}}/>
      <motion.g className="thank-you-duo-jumper" style={{originX:'320px',originY:'555px',transformBox:'view-box'}} animate={active?{y:[0,10,-72,-15,0,5,0,12,-100,-25,0,4,0],scaleX:[1,1.05,.98,.99,1.04,1,1,1.06,.97,.99,1.04,1,1],scaleY:[1,.94,1.04,1.02,.94,1,1,.93,1.05,1.02,.94,1,1],rotate:[0,-3,2,1,-1,0,0,3,-2,-1,1,0,0]}:{y:0,scaleX:1,scaleY:1,rotate:0}} transition={active?{duration:8.4,times:jumpTimes,repeat:Infinity,ease:'easeInOut'}:{duration:0}}>
        <motion.path className="thank-you-flag-tail thank-you-flag-tail-left" d={leftTail} fill="#1cb0f6"/>
        <motion.path className="thank-you-flag-tail thank-you-flag-tail-right" d={rightTail} fill="#ff4b4b"/>
        <motion.g className="thank-you-wing thank-you-wing-left" style={{rotate:leftAngle,originX:'188px',originY:'315px',transformBox:'view-box'}}>
          <path d="M199 328C160 323 121 296 86 258 58 228 36 196 42 183 48 169 72 183 104 193 149 210 186 244 214 284 232 310 223 328 199 328Z" fill="#58cc02"/>
          <path d="M59 195c25 16 60 38 88 69-37-14-64-40-88-69Z" fill="#70d900"/>
        </motion.g>
        <motion.g className="thank-you-wing thank-you-wing-right" style={{rotate:rightAngle,originX:'452px',originY:'315px',transformBox:'view-box'}}>
          <path d="M441 328c39-5 78-32 113-70 28-30 50-62 44-75-6-14-30 0-62 10-45 17-82 51-110 91-18 26-9 44 15 44Z" fill="#58cc02"/>
          <path d="M581 195c-25 16-60 38-88 69 37-14 64-40 88-69Z" fill="#70d900"/>
        </motion.g>
        <image className="thank-you-duo-body" href="/thank-you-duo-body.webp" width="640" height="640"/>
        <g className="thank-you-flag" clipPath={`url(#${id}-flag)`}>
          <rect x="0" y="100" width="240" height="410" fill="#1cb0f6"/><rect x="240" y="100" width="160" height="410" fill="#fff"/><rect x="400" y="100" width="240" height="410" fill="#ff4b4b"/>
          <motion.path d={foldPath} fill="#173e6d" opacity=".09"/>
        </g>
      </motion.g>
    </g>
  </svg>
}
