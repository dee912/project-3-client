import { useEffect } from 'react'

export default function Projectile({ handleCatch, handleSmash, xPosition, yPosition, height, width, falling }) {
  const xPixels = (xPosition * width / 100)
  const yPixels = height - (yPosition * height / 100)

  console.log(falling)

  useEffect(() => {
    if (falling && (xPixels < 0 || xPixels > width - 100 || yPixels > height)) {
      handleSmash()
    }
  }, [xPosition, yPosition])

  return (
    <div 
      onClick={handleCatch} 
      className="projectile"
      style={ { position: 'relative', left: `${xPixels}px`, top: `${yPixels - 100}px` } }
    >
      <div className="inner">
      </div>
    </div>
    
  )
}