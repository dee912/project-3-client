import { useEffect } from 'react'

export default function Projectile({ handleCatch, handleSmash, xPosition, yPosition, falling, smashed }) {
  const xPixels = (xPosition * 8)
  const yPixels = 600 - (yPosition * 6)

  useEffect(() => {
    if (falling && (xPixels < 0 || xPixels > 700 || yPixels > 600)) {
      handleSmash()
    }
  }, [falling, handleSmash, xPixels, yPixels])

  return (
    <svg 
      width="100" 
      height="100" 
      fill='none' 
      stroke='black' 
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleCatch} 
      style={ { left: `${xPixels - 400}px`, top: `${yPixels - 100}px` } }
      className={(smashed ? 'exploded ' : '') + 'projectile'}
    >
      <g className='topLeft'>
        <path d="M 50 0 A 50 50 0 0 0 0 50" />
        <path d="M 42.041 15.918 A 35 35 0 0 0 15.72 45.82" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 0 50 L 20 45 L 25 30 L 50 50" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 50 0 L 40  20 L 55 30 L 50 35 L 50 50" />
      </g>
      <g className='bottomLeft'>
        <path d="M 0 50 A 50 50 0 0 0 50 100" />
        <path d="M 15.72 45.82 A 35 35 0 0 0 50 84.541" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 0 50 L 20 45 L 25 30 L 50 50" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 50 100 L 50 80 L 40 70 L 50 50" />
      </g>
      <g className='bottomRight'>
        <path d="M 50 100 A 50 50 0 0 0 100 50" />
        <path d="M 50 84.541 A 35 35 0 0 0 85.124 42.639" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 50 100 L 50 80 L 40 70 L 50 50" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 100 50 L 80 40 L 70 60 L 50 50" />
      </g>
      <g className='topRight'>
        <path d="M 100 50 A 50 50 0 0 0 50 0" />
        <path d="M 85.124 42.639 A 35 35 0 0 0 42.041 15.918" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 100 50 L 80 40 L 70 60 L 50 50" />
        <path display={smashed ? 'block' : 'none'} className="crack" d="M 50 0 L 40  20 L 55 30 L 50 35 L 50 50" />
      </g>
    </svg>
  )
}