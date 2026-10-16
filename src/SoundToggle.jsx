import { useSyncExternalStore } from 'react'
import { getSoundEnabled, setSoundEnabled, subscribeSound } from './audio/soundEngine'
import './SoundToggle.css'

export default function SoundToggle() {
  const enabled=useSyncExternalStore(subscribeSound,getSoundEnabled,getSoundEnabled)
  return <button className="sound-toggle" type="button" aria-label={enabled?'Mute sound effects':'Unmute sound effects'} aria-pressed={enabled} title={enabled?'Sound effects on':'Sound effects off'} onClick={()=>setSoundEnabled(!enabled)}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 4-6 5H2v6h3l6 5V4Z"/>{enabled?<><path d="M15 8c2 2 2 6 0 8M18 5c4 4 4 10 0 14"/></>:<path d="m16 9 6 6m0-6-6 6"/>}</svg>
  </button>
}
