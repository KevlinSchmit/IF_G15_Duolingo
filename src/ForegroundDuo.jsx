import { useId } from 'react'
import { motion } from 'motion/react'

export default function ForegroundDuo({reduced,active=true}) {
  const id=useId().replaceAll(':','')
  return <motion.svg className="foreground-duo-rig" x="30" y="570" width="325" height="280" viewBox="180 100 860 850" overflow="visible" initial={reduced?false:{opacity:0,y:25,scale:.92}} animate={{opacity:1,y:0,scale:1}} style={{transformOrigin:'180px 855px'}} transition={{delay:reduced?0:.47,duration:reduced?0:.3}}>
    <defs><clipPath id={`${id}-body`}><rect x="300" y="0" width="724" height="1024"/></clipPath><clipPath id={`${id}-arm`}><rect x="0" y="390" width="280" height="345"/></clipPath></defs>
    <g className="foreground-duo-bob">
      {!reduced&&active&&<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="3.8s" repeatCount="indefinite"/>}
      <g className="foreground-duo-sway">
        {!reduced&&active&&<animateTransform attributeName="transform" type="rotate" values="0 640 900;-1.1 640 900;1 640 900;0 640 900" keyTimes="0;.3;.7;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" dur="5.6s" repeatCount="indefinite"/>}
        <ellipse className="duo-shoulder-joint" cx="403" cy="650" rx="48" ry="45" fill="#ff3538"/>
        <g className="left-duo-wave">
          {!reduced&&active&&<animateTransform attributeName="transform" type="rotate" values="0 403 650;0 403 650;6 403 650;-3 403 650;5 403 650;0 403 650;0 403 650" keyTimes="0;.25;.39;.53;.67;.82;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1" dur="5.2s" repeatCount="indefinite"/>}
          <g transform="translate(174 -10)"><image href="/foreground-duo-rig.png" width="1024" height="1024" clipPath={`url(#${id}-arm)`}/></g>
        </g>
        <image className="foreground-duo-body" href="/foreground-duo-rig.png" width="1024" height="1024" clipPath={`url(#${id}-body)`}/>
      </g>
    </g>
  </motion.svg>
}
