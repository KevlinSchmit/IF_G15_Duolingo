// Original, short game-like sounds synthesized locally; no downloaded audio.
const noiseBuffers=new WeakMap()
const floor=.0001

function noiseBuffer(context) {
  if(noiseBuffers.has(context))return noiseBuffers.get(context)
  const buffer=context.createBuffer(1,context.sampleRate,context.sampleRate)
  const data=buffer.getChannelData(0)
  let seed=18731
  for(let i=0;i<data.length;i++){
    seed=(1664525*seed+1013904223)>>>0
    data[i]=(seed/4294967296)*2-1
  }
  noiseBuffers.set(context,buffer)
  return buffer
}

export const soundNames=['whoosh','paper','camera','morph','jump','land','assemble','pop','prompt','scan','success','share','award','glint','sparkle','label','progress']

export function renderSound(context,output,name,start,{volume=1,pitch=1}={}) {
  const sources=[],nodes=[]
  let end=start
  const keep=(node)=>{nodes.push(node);return node}
  const envelope=(at,duration,level,attack=.008)=>{
    const gain=keep(context.createGain())
    gain.gain.setValueAtTime(floor,at)
    gain.gain.exponentialRampToValueAtTime(Math.max(floor,level*volume),at+attack)
    gain.gain.exponentialRampToValueAtTime(floor,at+duration)
    gain.connect(output)
    return gain
  }
  const tone=(frequency,delay,duration,level=.12,type='sine',bend=null)=>{
    const at=start+delay,oscillator=keep(context.createOscillator())
    oscillator.type=type
    oscillator.frequency.setValueAtTime(frequency*pitch,at)
    if(bend)for(const [time,value] of bend)oscillator.frequency.exponentialRampToValueAtTime(value*pitch,at+time)
    oscillator.connect(envelope(at,duration,level))
    oscillator.start(at)
    oscillator.stop(at+duration+.015)
    sources.push(oscillator)
    end=Math.max(end,at+duration+.015)
  }
  const bell=(frequency,delay,duration=.32,level=.1)=>{
    tone(frequency,delay,duration,level)
    tone(frequency*2.76,delay,duration*.48,level*.14)
  }
  const noise=(delay,duration,level,low,high=low)=>{
    const at=start+delay,source=keep(context.createBufferSource()),filter=keep(context.createBiquadFilter())
    source.buffer=noiseBuffer(context)
    filter.type='bandpass'
    filter.Q.value=.7
    filter.frequency.setValueAtTime(low,at)
    filter.frequency.exponentialRampToValueAtTime(high,at+duration*.55)
    filter.frequency.exponentialRampToValueAtTime(low*.8,at+duration)
    source.connect(filter)
    filter.connect(envelope(at,duration,level,Math.min(.045,duration*.18)))
    source.start(at)
    source.stop(at+duration+.015)
    sources.push(source)
    end=Math.max(end,at+duration+.015)
  }
  const pop=(delay=0,frequency=510,level=.15)=>tone(frequency,delay,.17,level,'sine',[[.025,frequency*1.18],[.16,frequency*.5]])

  switch(name){
    case 'whoosh':noise(0,.38,.15,420,1900);break
    case 'paper':noise(0,.13,.2,320,600);tone(125,0,.16,.19,'sine',[[.15,65]]);break
    case 'camera':noise(0,.035,.18,2100);noise(.055,.07,.12,1400);tone(760,.01,.045,.065,'triangle');break
    case 'morph':tone(392,0,.4,.1,'sine',[[.28,784],[.39,1046.5]]);bell(1318.5,.2,.28,.06);break
    case 'jump':tone(260,0,.29,.15,'sine',[[.055,690],[.28,390]]);break
    case 'land':pop(0,260,.1);break
    case 'assemble':[0,.13,.32,.48,.66].forEach((delay,index)=>pop(delay,330+index*55,.085));break
    case 'pop':pop();break
    case 'prompt':bell(659.25,0,.3,.12);bell(880,.11,.36,.1);break
    case 'scan':tone(880,0,.095,.12,'sine');tone(1318.5,.115,.14,.1,'sine');break
    case 'success':[523.25,659.25,783.99,1046.5].forEach((note,index)=>bell(note,index*.105,.42,index===3?.13:.1));tone(261.63,0,.5,.065);break
    case 'share':[783.99,987.77,1174.66].forEach((note,index)=>bell(note,index*.085,.35,.09));break
    case 'award':bell(783.99,0,.42,.1);bell(1046.5,.13,.5,.1);bell(1318.5,.25,.45,.09);break
    case 'glint':bell(1567.98,0,.22,.075);bell(2093,.09,.23,.065);break
    case 'sparkle':[1046.5,1567.98,2093,1318.51,2349.32,2637.02].forEach((note,index)=>bell(note,index*.105,.34,.065-index*.004));break
    case 'label':bell(880,0,.14,.065);break
    case 'progress':[523.25,659.25,880].forEach((note,index)=>bell(note,index*.09,.38,.095));break
    default:break
  }
  return {sources,nodes,end}
}
