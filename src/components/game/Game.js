import { useState } from 'react'
import Projectile from './Projectile'
import { motion } from 'framer-motion'

export default function Game() {
  const [currentProjectile, setCurrentProjectile] = useState({
    xPosition: 0,
    yPosition: 0,
  })

  const handleClick = (event) => {
    console.log('click')
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }} 
      exit={{ opacity: 0 }}
    >
    <div className="gamebg"></div>
      <div className="game">
        <Projectile 
          onClick={handleClick}
        />
      </div>
    </motion.div>
  )
}