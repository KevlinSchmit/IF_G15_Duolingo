import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { beginSoundScene, mountSoundSystem, playSound, stopSoundScope } from './soundEngine'

export function usePresentationSound(page) {
  useLayoutEffect(()=>beginSoundScene(page),[page])
  useEffect(()=>mountSoundSystem(),[])
}

export function useSoundScope(persistent=false) {
  const scope=useRef({persistent})
  const live=useRef(true)
  useEffect(()=>{
    live.current=true
    const current=scope.current
    return()=>{live.current=false;stopSoundScope(current)}
  },[])
  return useCallback((name,options={})=>{
    if(live.current)playSound(name,{...options,scope:scope.current})
  },[])
}

// Keyed to an entrance or action, never to idle frames, viewport changes or mute.
export function useSoundSequence(key,cues,active=true) {
  const latest=useRef(cues)
  useLayoutEffect(()=>{latest.current=cues})
  useEffect(()=>{
    if(!active)return
    const scope={persistent:false}
    // Deferring one task prevents duplicate cues during StrictMode's setup pass.
    const timer=setTimeout(()=>{
      latest.current.forEach(({name,...options})=>playSound(name,{...options,scope}))
    },0)
    return()=>{clearTimeout(timer);stopSoundScope(scope)}
  },[key,active])
}
