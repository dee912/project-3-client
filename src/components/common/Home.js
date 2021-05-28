import React from 'react'
import { useHistory } from 'react-router'
import { motion } from 'framer-motion'
import Crack from '../../sounds/Crack.wav'
import Crack2 from '../../sounds/Crack2.wav'
import Smash from '../../sounds/Smash.wav'

const pageVariants = {
  initial: {
    opacity: 0,
    y: '-100vh',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '100vh',
  },
}
const pageTransition = {
  type: 'spring',
  stiffness: 100,
}

export default function Home() {
  const crackSounds = [Crack, Crack2]
  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])
  const [grow, setGrow] = React.useState(false)
  const [clicks, setClicks] = React.useState(0)
  const history = useHistory()

  const handleClick = () => {
    const audio = document.getElementById('plateSound')
    if (clicks + 1 !== 8 ) {
      audio.src = crackSounds[Math.round(Math.random())]
    } else {
      audio.src = Smash
    }
    audio.volume = 0.1
    if (clicks <= 8) {
      audio.play()
    }
    setGrow(true)
    setClicks(clicks + 1)
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <audio id='plateSound'/>
      <div className='homeBackground'>
        <div className='home'>
          <h1 className='noSelect'>R8 MY PL8 M8</h1>
          <svg width="100" height="100" fill='none' stroke='black' xmlns="http://www.w3.org/2000/svg" onClick={handleClick} onTransitionEnd={() => setGrow(false)} className={`plate ${grow ? 'grow' : ''} ${clicks >= 8 ? 'exploded' : ''}`}>
            <g className='topLeft'>
              <path d="M 50 0 A 50 50 0 0 0 0 50" />
              <path d="M 42.041 15.918 A 35 35 0 0 0 15.72 45.82" />

              <path className={clicks < 2 ? 'crack' : ''} d="M 0 50 L 20 45 L 25 30 L 50 50" />
              <path className={clicks < 2 ? 'crack' : ''} d="M 50 0 L 40  20 L 55 30 L 50 35 L 50 50" />
            </g>
            <g className='bottomLeft'>
              <path d="M 0 50 A 50 50 0 0 0 50 100" />
              <path d="M 15.72 45.82 A 35 35 0 0 0 50 84.541" />

              <path className={clicks < 4 ? 'crack' : ''} d="M 0 50 L 20 45 L 25 30 L 50 50" />
              <path className={clicks < 4 ? 'crack' : ''} d="M 50 100 L 50 80 L 40 70 L 50 50" />
            </g>
            <g className='bottomRight'>
              <path d="M 50 100 A 50 50 0 0 0 100 50" />
              <path d="M 50 84.541 A 35 35 0 0 0 85.124 42.639" />

              <path className={clicks < 6 ? 'crack' : ''} d="M 50 100 L 50 80 L 40 70 L 50 50" />
              <path className={clicks < 6 ? 'crack' : ''} d="M 100 50 L 80 40 L 70 60 L 50 50" />
            </g>
            <g className='topRight'>
              <path d="M 100 50 A 50 50 0 0 0 50 0" />
              <path d="M 85.124 42.639 A 35 35 0 0 0 42.041 15.918" />

              <path className={clicks < 8 ? 'crack' : ''} d="M 100 50 L 80 40 L 70 60 L 50 50" />
              <path className={clicks < 8 ? 'crack' : ''} d="M 50 0 L 40  20 L 55 30 L 50 35 L 50 50" />
            </g>
          </svg>
          {clicks >= 8 && <button className='toPl8s' onClick={() => history.push('/pl8s')}>View Pl8s 🍽</button>}
        </div>
      </div>
    </motion.div>
  )
}