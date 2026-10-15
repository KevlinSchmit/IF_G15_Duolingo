import { useId } from 'react'
import { motion } from 'motion/react'
import RigMotion from './RigMotion'

// A greeting, a welcoming lean, a small celebratory hop, then a nod.
const routine=[
  {time:0,arm:0,lean:0,lift:0,scale:1},
  {time:.05,arm:25,lean:-2,lift:-3,scale:1.01},
  {time:.10,arm:8,lean:1,lift:0,scale:1},
  {time:.15,arm:30,lean:-2,lift:-4,scale:1.01},
  {time:.20,arm:10,lean:0,lift:0,scale:1},
  {time:.27,arm:0,lean:2,lift:0,scale:1},
  {time:.34,arm:-28,lean:4,lift:2,scale:1},
  {time:.40,arm:-28,lean:4,lift:0,scale:.99},
  {time:.46,arm:-5,lean:0,lift:0,scale:1},
  {time:.50,arm:-12,lean:-2,lift:7,scale:.95},
  {time:.54,arm:18,lean:-3,lift:-28,scale:1.04},
  {time:.58,arm:5,lean:2,lift:3,scale:.94},
  {time:.63,arm:0,lean:0,lift:0,scale:1},
  {time:.70,arm:22,lean:-4,lift:4,scale:1.01},
  {time:.78,arm:0,lean:-4,lift:0,scale:1},
  {time:.86,arm:-18,lean:0,lift:0,scale:1},
  {time:.93,arm:0,lean:1,lift:-2,scale:1},
  {time:1,arm:0,lean:0,lift:0,scale:1},
]
const times=routine.map(frame=>frame.time)

export default function ForegroundDuo({reduced,active=true}) {
  const id=useId().replaceAll(':','')
  const moving=active&&!reduced
  return <motion.svg className="foreground-duo-rig" x="30" y="570" width="325" height="280" viewBox="180 100 860 850" overflow="visible" initial={reduced?false:{opacity:0,y:25,scale:.92}} animate={{opacity:1,y:0,scale:1}} style={{transformOrigin:'180px 855px'}} transition={{delay:reduced?0:.47,duration:reduced?0:.3}}>
    <defs><clipPath id={`${id}-arm`}><rect x="0" y="390" width="280" height="345"/></clipPath></defs>
    <RigMotion className="foreground-duo-bob" type="translate" values={routine.map(frame=>[0,frame.lift])} times={times} enabled={moving}>
      <g transform="translate(600 900)">
        <RigMotion className="foreground-duo-sway" values={routine.map(frame=>frame.lean)} times={times} enabled={moving}>
          <RigMotion className="foreground-duo-stretch" type="scale" values={routine.map(frame=>[1,frame.scale])} times={times} enabled={moving}>
            <g transform="translate(-600 -900)">
              <g transform="translate(403 650)">
                <RigMotion className="left-duo-wave" values={routine.map(frame=>frame.arm)} times={times} enabled={moving}>
                  <g transform="translate(-198 -658)"><image href="/foreground-duo-rig.png" width="1024" height="1024" clipPath={`url(#${id}-arm)`}/></g>
                </RigMotion>
              </g>
              <image className="foreground-duo-body" href="/foreground-duo-animation-body.png" width="1024" height="1024"/>
            </g>
          </RigMotion>
        </RigMotion>
      </g>
    </RigMotion>
  </motion.svg>
}
