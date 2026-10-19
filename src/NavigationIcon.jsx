import './NavigationIcon.css'

export default function NavigationIcon({ back = false, replay = false }) {
  return <svg className="navigation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {replay ? <path d="M3 12a9 9 0 1 0 2.636-6.364L3 8M3 3v5h5"/> : <path d="M5 12h14m-6-6 6 6-6 6" transform={back ? 'rotate(180 12 12)' : undefined}/>}
  </svg>
}
