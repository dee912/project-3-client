import { useState } from 'react'
import Projectile from './Projectile'

export default function Game() {
  const [currentProjectile, setCurrentProjectile] = useState({
    xPosition: 0,
    yPosition: 0,
  })

  const handleClick = (event) => {
    console.log('click')
  }

  return (
    <div className="game">
      <Projectile 
        onClick={handleClick}
      />
    </div>
  )
}