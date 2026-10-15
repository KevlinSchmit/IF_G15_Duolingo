import { useCallback } from 'react'

const encode=value=>Array.isArray(value)?value.join(' '):String(value)

// Joint transforms use local SVG coordinates, with a shared, closed timeline.
export default function RigMotion({type='rotate',values,times,duration=14,enabled,className,children}) {
  const start=useCallback(node=>node?.beginElement(),[])
  return <g className={className} transform={`${type}(${encode(values[0])})`}>
    {enabled&&<animateTransform ref={start} attributeName="transform" type={type} begin="indefinite" values={values.map(encode).join(';')} keyTimes={times.join(';')} calcMode="spline" keySplines={times.slice(1).map(()=>'.42 0 .58 1').join(';')} dur={`${duration}s`} repeatCount="indefinite"/>}
    {children}
  </g>
}
