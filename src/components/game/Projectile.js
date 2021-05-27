import { useEffect } from 'react'

export default function Projectile({ handleCatch, handleSmash, xPosition, yPosition, height, width }) {
  console.log(height)
  console.log(yPosition)
  useEffect(() => {
    if (xPosition / 100 > (width - 100) / width || (yPosition <= 0 && xPosition > 50)) {
      handleSmash()
    }
  }, [xPosition, yPosition])

  return (
    <div 
      onClick={handleCatch} 
      className="projectile"
      style={ { marginLeft: xPosition + '%', marginTop: 50 - yPosition + '%' } }
    >
      <div className="inner">
      </div>
    </div>
  )
}