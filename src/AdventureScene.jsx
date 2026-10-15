import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import CamilleIdle from './CamilleIdle'
import ForegroundDuo from './ForegroundDuo'
import KioskVideoPanel from './KioskVideoPanel'
import OutfitDetail from './OutfitDetail'
import './AdventureScene.css'

// Painting order is independent of reveal timing: the ground can arrive last
// while still sitting behind the kiosks, characters and displays.
const layers = [
  {name:'clouds',path:'M0 0H1600V900H0Z',delay:0,origin:'800px 180px'},
  {name:'bridge',path:'M475 250 935 255 1090 300 1090 450 470 375Z M940 315 983 22 1018 22 1055 330Z',delay:.045,origin:'800px 370px'},
  {name:'ground',path:'M0 595 460 580 620 615 965 595 1260 640 1600 655V900H0Z',delay:.65,origin:'800px 900px'},
  {name:'left-cupboards',path:'M0 185 355 150 490 230 488 630 292 696 0 739Z',delay:.2,origin:'230px 690px'},
  {name:'right-cupboards',path:'M1172 270 1215 151Q1415 73 1530 194L1595 260V681L1230 625Z',delay:.23,origin:'1400px 660px'},
  {name:'cashier',path:'M975 445 1155 371 1233 450 1233 633 1110 675 975 597Z',delay:.28,origin:'1110px 655px'},
  {name:'kiosk-one',path:'M448 409Q455 359 484 350L507 336Q583 350 592 409L608 431V688L447 688Z',delay:.33,origin:'529px 688px'},
  {name:'kiosk-two',path:'M633 408Q625 369 650 350Q705 320 745 355L775 405V680L633 680Z',delay:.375,origin:'706px 680px'},
  {name:'kiosk-three',path:'M820 403Q819 357 872 341Q933 333 951 400L964 422V678L820 678Z',delay:.42,origin:'895px 678px'},
  {name:'lamp-left',path:'M32 199Q26 165 65 150Q91 155 100 192L92 240 82 246V580H55V246L44 241Z',delay:.09,origin:'68px 580px'},
  {name:'lamp-middle-left',path:'M481 132Q475 109 512 91Q544 98 546 126L538 175 527 186V355H502V186L490 177Z',delay:.105,origin:'514px 355px'},
  {name:'lamp-center',path:'M774 188Q768 159 802 150Q831 160 831 187L824 226 816 240V414H790V239L780 228Z',delay:.12,origin:'802px 414px'},
  {name:'lamp-right',path:'M1087 187Q1080 161 1116 150Q1145 161 1144 188L1135 226 1128 239V487H1103V237L1094 230Z',delay:.135,origin:'1116px 487px'},
  {name:'foreground-duo',path:'M37 620Q54 598 96 590L210 565Q257 596 246 664L309 631Q345 621 340 664L305 743 311 866 264 896 82 896 38 817Z',delay:.47,origin:'178px 870px'},
  {name:'display-back',path:'M1099 639Q1110 575 1196 568Q1220 600 1270 633L1339 665 1329 752 1099 763Z',delay:.51,origin:'1220px 750px'},
  {name:'display-front',path:'M1039 741Q1026 704 1055 685Q1136 689 1208 728L1328 701 1365 778 1340 868 1044 868Z',delay:.545,origin:'1200px 850px'},
  {name:'share-sign',path:'M1385 620Q1390 605 1412 609L1578 625Q1595 630 1595 656L1595 900H1348L1329 848Z',delay:.58,origin:'1470px 890px'},
]
const lamps=[{x:68,y:216},{x:514,y:154},{x:802,y:207},{x:1116,y:207}]

export default function AdventureScene({hideCharacter=false,focused=false,onSelectKiosk,videoReplay=0,demo='proficiency',showGallery=false,showOutfit=false,hideOutfitCharacter=false}) {
  const reduced=useReducedMotion()
  const [cameraReady,setCameraReady]=useState(false)
  const [assembled,setAssembled]=useState(Boolean(reduced))
  useEffect(()=>{
    // Readiness follows navigation only; resizing/fullscreen must not hide the panel.
    const timer=setTimeout(()=>setCameraReady(focused),focused&&!reduced?750:0)
    return()=>clearTimeout(timer)
  },[focused,reduced])
  const id=useId().replaceAll(':','')
  return <section className="adventure-scene" aria-label={showOutfit ? 'The winning Duo outfit' : showGallery ? 'Scan the Cloth result screens' : focused ? demo==='sharing' ? 'Sharing Outfit video and Paris Fashion Challenge' : demo==='scan' ? 'Scan the Cloth video slide' : demo==='clothing' ? 'Find Clothing video slide' : 'Machine 01: Personalized proficiency' : 'Camille’s Paris fashion adventure'}><div className={`adventure-stage ${focused?'focused-stage':''}`}>
    <motion.div className="adventure-world" initial={false} animate={focused?{scale:1.85,x:'-5%',y:'-4%'}:{scale:1,x:'0%',y:'0%'}} transition={{duration:reduced?0:.75,ease:[.22,.7,.2,1]}}><div className={`adventure-artwork ${focused?'artwork-blurred':''}`}>
    <svg className="adventure-panorama" viewBox="0 0 1600 900" role="group" aria-label="Paris scene with clouds, bridge, lamps, fashion shelves, cashier, three kiosks, Duo displays and a share-your-outfit sign">
      <defs>
        {!assembled&&layers.map((layer,index)=><mask key={layer.name} id={`${id}-${layer.name}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><path d={layer.path} fill="white"/>{layers.slice(index+1).map(front=><path key={front.name} d={front.path} fill="black"/>)}</mask>)}
        <radialGradient id={`${id}-lamp-light`}><stop offset="0" stopColor="#fff6b1" stopOpacity=".85"/><stop offset="1" stopColor="#fff6b1" stopOpacity="0"/></radialGradient>
      </defs>
      {!assembled&&layers.map(layer=><motion.g key={layer.name} className="adventure-piece" data-part={layer.name} data-delay={layer.delay} style={{transformOrigin:layer.origin}} initial={reduced?false:{opacity:0,y:layer.name==='ground'?24:35,scale:layer.name==='clouds'?.97:.92}} animate={{opacity:1,y:0,scale:1}} transition={{delay:reduced?0:layer.delay,duration:reduced?0:.3,type:'spring',bounce:.16}}><image href="/paris-adventure.png" width="1600" height="900" preserveAspectRatio="none" mask={`url(#${id}-${layer.name})`}/></motion.g>)}
      <motion.g className="panorama-composite" initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:1.02,duration:reduced?0:.1}} onAnimationComplete={()=>setAssembled(true)}><image href="/paris-adventure.png" width="1600" height="900" preserveAspectRatio="none"/></motion.g>
      <ForegroundDuo reduced={reduced} active={!focused}/>
      {lamps.map((lamp,index)=><motion.ellipse key={index} className="lamp-glow" cx={lamp.x} cy={lamp.y} rx="39" ry="49" fill={`url(#${id}-lamp-light)`} initial={{opacity:0}} animate={reduced||focused?{opacity:.24}:{opacity:[.18,.18,.5,.22,.4,.18]}} transition={reduced||focused?{duration:0}:{delay:1.2+index*.17,duration:5.5+index*.3,repeat:Infinity,ease:'easeInOut'}}/>)}
      {!focused&&onSelectKiosk&&<g className="kiosk-hit-target" role="button" tabIndex="0" aria-label="Zoom in to machine 01" onClick={onSelectKiosk} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();onSelectKiosk()}}}><rect x="448" y="334" width="163" height="354" rx="24" fill="transparent"/></g>}
    </svg>
    <div className={`adventure-character ${hideCharacter?'character-in-flight':''}`}><div className="character-ground-shadow"/><CamilleIdle active={!hideCharacter&&!focused}/></div>
    </div></motion.div>
    <AnimatePresence mode="wait">{showOutfit ? <OutfitDetail key="outfit" hideCharacter={hideOutfitCharacter} replay={videoReplay}/> : focused&&cameraReady&&<KioskVideoPanel key={demo} demo={demo} showGallery={showGallery} galleryReplay={videoReplay}/>}</AnimatePresence>
  </div></section>
}
