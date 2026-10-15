import { motion, useReducedMotion } from 'motion/react'
import './LearnerProgress.css'

function Crown() {
  return <svg viewBox="0 0 40 36" fill="none" aria-hidden="true"><path d="m5 12 8 6L20 5l7 13 8-6-4 17H9L5 12Z" fill="#ffd447" stroke="#e8ad17" strokeWidth="2.5" strokeLinejoin="round"/><path d="M11 32h18" stroke="#e8ad17" strokeWidth="3" strokeLinecap="round"/><path d="m18 13 2-4 2 4" stroke="#fff5b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Flame() {
  return <svg viewBox="0 0 30 38" fill="none" aria-hidden="true"><path d="M17 1c2 10 11 13 11 23 0 8-6 13-13 13S2 32 2 24c0-6 4-11 7-14-1 5 1 7 3 8C17 14 18 8 17 1Z" fill="#ff9600"/><path d="M16 19c1 5 6 7 6 11 0 4-3 6-7 6s-7-2-7-6c0-3 3-6 5-8-1 3 0 5 1 5 2-2 3-5 2-8Z" fill="#ffd447"/></svg>
}

export default function LearnerProgress({active=true}) {
  const reduced=useReducedMotion()
  return <motion.section className="learner-profile" aria-label="Emma’s learning progress" initial={reduced?false:{opacity:0,y:14,scale:.98}} animate={{opacity:active?1:0,y:active?0:14,scale:active?1:.98}} transition={{duration:reduced?0:.42,delay:reduced?0:.05,type:'spring',bounce:.18}}>
    <div className="learner-identity">
      <svg className="learner-avatar" viewBox="215 300 740 740" role="img" aria-label="Duo avatar"><image href="/duo-winning-outfit.png" x="0" y="0" width="1146" height="1373"/></svg>
      <div><h3>Emma</h3><p>Advanced French learner</p></div>
    </div>
    <div className="learner-proficiency">
      <div className="proficiency-caption"><span>French proficiency</span><strong>70%</strong></div>
      <div className="french-progress-track" role="progressbar" aria-label="French proficiency" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70">
        <motion.div className="french-progress-fill" initial={reduced?false:{width:'0%'}} animate={{width:active?'70%':'0%'}} transition={{duration:reduced?0:1,delay:reduced?0:.25,ease:[.22,.7,.2,1]}}/>
      </div>
    </div>
    <div className="learner-streak"><Flame/><div><span>Learning streak</span><strong>890 days</strong></div></div>
    <div className="learner-rank" aria-label="First place"><Crown/><strong>#1</strong></div>
  </motion.section>
}
