import { useEffect, useRef, useState } from 'react'
import { getSoundEnabled, playSound, setSoundEnabled, stopSoundScope, unlockSound } from './audio/soundEngine'
import { soundNames } from './audio/soundRecipes'
import './SoundPreview.css'

// Match the levels used by the existing scene cues; share their master volume.
const previews = {
  whoosh: { label: 'Whoosh', volume: .65 },
  paper: { label: 'Poster placement', volume: 1 },
  camera: { label: 'Camera flash', volume: 1 },
  morph: { label: 'Transformation', volume: .8 },
  jump: { label: 'Jump', volume: .75 },
  land: { label: 'Landing', volume: .7 },
  assemble: { label: 'Scene reveal', volume: .7 },
  pop: { label: 'Pop', volume: .6 },
  step: { label: 'Learning step', volume: .8 },
  scan: { label: 'NFC scan', volume: .65 },
  success: { label: 'Success', volume: .9 },
  glint: { label: 'Glint', volume: 1 },
  sparkle: { label: 'Sparkle', volume: .85 },
  label: { label: 'Label', volume: .65 },
  progress: { label: 'Progress', volume: .85 },
}

export default function SoundPreview() {
  const scope = useRef({ persistent: false })
  const [index, setIndex] = useState(0)
  const [lastPlayed, setLastPlayed] = useState(null)
  useEffect(() => {
    const current = scope.current
    return () => stopSoundScope(current)
  }, [])
  const next = soundNames[index]
  const preview = event => {
    event.stopPropagation()
    // Requesting a preview explicitly turns sound on, including a saved mute.
    if (!getSoundEnabled()) setSoundEnabled(true)
    else unlockSound()
    stopSoundScope(scope.current)
    const name = soundNames[index]
    playSound(name, { scope: scope.current, volume: previews[name]?.volume ?? 1 })
    setIndex(current => (current + 1) % soundNames.length)
    setLastPlayed(name)
  }
  return <>
    <button className="sound-preview" type="button" aria-label="Play next sound effect" title={`Play next sound effect: ${previews[next]?.label ?? next}`} onClick={preview}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 17V5l11-2v12M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></svg>
      <span>Sound effects</span>
    </button>
    <span className="sound-preview-status" role="status">{lastPlayed ? `Playing ${previews[lastPlayed]?.label ?? lastPlayed} sound effect. Click again for the next sound.` : ''}</span>
  </>
}
