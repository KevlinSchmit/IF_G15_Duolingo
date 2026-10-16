function NoteIcon({type}) {
  const paths={
    checkin:<><rect x="5" y="3" width="14" height="13" rx="2"/><path d="M12 16v5m-4 0h8m-8-11 3 3 5-6"/></>,
    account:<><path d="M4 8V4h4m8 0h4v4M4 16v4h4m12-4v4h-4"/><circle cx="12" cy="9" r="2.5"/><path d="M7.5 17c.5-4 8.5-4 9 0"/></>,
    challenge:<><rect x="5" y="3" width="14" height="18" rx="3"/><path d="m12 7 1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L12 7ZM9 18h6"/></>,
    learn:<><path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1v14"/></>,
    listen:<><path d="m11 5-5 4H3v6h3l5 4V5Zm4 4c2 2 2 4 0 6m3-9c4 4 4 8 0 12"/></>,
    find:<><path d="M10 7a2 2 0 1 1 3 2l-1 1v2l8 5a1.6 1.6 0 0 1-.8 3H4.8a1.6 1.6 0 0 1-.8-3l8-5"/></>,
    interact:<><path d="M9 12V5a2 2 0 0 1 4 0v6l2-1 5 2-1 7a3 3 0 0 1-3 2h-4a4 4 0 0 1-3-2l-4-5a2 2 0 0 1 3-2l1 1"/></>,
    scan:<><path d="M3 8V3h5m8 0h5v5M3 16v5h5m13-5v5h-5M3 12h18"/><path d="m8 6 4 2 4-2 2 3-3 2v7H9v-7L6 9l2-3Z"/></>,
    progress:<><path d="m7 4 5 2 5-2 4 5-4 2v9H7v-9L3 9l4-5Z"/><path d="m9 14 2 2 4-4"/></>,
    share:<><path d="M7 10H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2M12 15V3m-4 4 4-4 4 4"/></>,
    likes:<path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z"/>,
    ranking:<><path d="M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4M12 13v5m-4 3v-3h8v3H8Z"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

export default function PanelNotes({items}) {
  return <ul className="panel-notes" aria-label="How it works">{items.map(item=><li key={item.text}><span className="panel-note-icon"><NoteIcon type={item.icon}/></span><span>{item.text}</span></li>)}</ul>
}
