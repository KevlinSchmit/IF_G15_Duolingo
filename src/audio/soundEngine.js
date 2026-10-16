import { renderSound } from './soundRecipes'

const storageKey='french-fashion-sound-enabled'
const level=.72
let enabled=true
try{enabled=localStorage.getItem(storageKey)!=='false'}catch{/* Storage can be unavailable in private browsing. */}
let context=null,master=null,unlocked=false,scene=null,resuming=false
const listeners=new Set(),voices=new Set()

export const getSoundEnabled=()=>enabled
export const subscribeSound=listener=>{listeners.add(listener);return()=>listeners.delete(listener)}

export function unlockSound() {
  if(!enabled||document.hidden)return
  const Audio=window.AudioContext||window.webkitAudioContext
  if(!Audio)return
  try{
    if(!context||context.state==='closed'){
      context=new Audio({latencyHint:'interactive'})
      master=context.createGain()
      master.gain.value=enabled?level:0
      const limiter=context.createDynamicsCompressor()
      limiter.threshold.value=-14
      limiter.knee.value=18
      limiter.ratio.value=4
      limiter.attack.value=.004
      limiter.release.value=.12
      master.connect(limiter)
      limiter.connect(context.destination)
    }
    unlocked=true
    if(context.state!=='running'&&!resuming){
      resuming=true
      context.resume().catch(()=>{unlocked=false}).finally(()=>{resuming=false})
    }
  }catch{unlocked=false}
}

function release(voice,fade=true) {
  if(!voices.has(voice))return
  voices.delete(voice)
  clearTimeout(voice.timer)
  const now=context?.currentTime??0
  if(fade){
    voice.gain.gain.cancelScheduledValues(now)
    voice.gain.gain.setTargetAtTime(0,now,.008)
    for(const node of voice.sources)try{node.stop(now+.045)}catch{/* A source may have already ended. */}
  }
  const disconnect=()=>{voice.gain.disconnect();voice.nodes.forEach(node=>node.disconnect())}
  if(fade)setTimeout(disconnect,65)
  else disconnect()
}

export function stopSoundScope(scope) {
  for(const voice of [...voices])if(voice.scope===scope)release(voice)
}
export function stopAllSounds() {
  for(const voice of [...voices])release(voice)
}
export function beginSoundScene(next) {
  if(scene===next)return
  scene=next
  // Cross-page character transformations own their sound until they land.
  for(const voice of [...voices])if(!voice.scope?.persistent)release(voice)
}

export function playSound(name,{scope=null,delay=0,volume=1,pitch=1}={}) {
  if(!enabled||!unlocked||!context||context.state==='closed'||document.hidden)return
  if(context.state!=='running'&&!resuming)return
  const start=context.currentTime+.012+Math.max(0,delay)
  const gain=context.createGain()
  gain.connect(master)
  const rendered=renderSound(context,gain,name,start,{volume:Math.max(0,Math.min(volume,1)),pitch})
  if(!rendered.sources.length){gain.disconnect();return}
  const voice={...rendered,gain,scope}
  voices.add(voice)
  voice.timer=setTimeout(()=>release(voice,false),Math.max(0,(rendered.end-context.currentTime)*1000)+100)
}

export function setSoundEnabled(next) {
  enabled=Boolean(next)
  try{localStorage.setItem(storageKey,String(enabled))}catch{/* Sound still works without persisted settings. */}
  if(!enabled)stopAllSounds()
  if(master){
    const now=context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setTargetAtTime(enabled?level:0,now,.008)
  }
  if(enabled)unlockSound()
  listeners.forEach(listener=>listener())
}

export function mountSoundSystem() {
  const unlock=()=>unlockSound()
  const visibility=()=>{if(document.hidden)stopAllSounds()}
  for(const event of ['pointerdown','click','keydown'])document.addEventListener(event,unlock,true)
  document.addEventListener('visibilitychange',visibility)
  return()=>{
    for(const event of ['pointerdown','click','keydown'])document.removeEventListener(event,unlock,true)
    document.removeEventListener('visibilitychange',visibility)
    stopAllSounds()
    const previous=context
    context=null
    master=null
    unlocked=false
    previous?.close().catch(()=>{})
  }
}
