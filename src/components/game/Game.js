import { useState, useEffect, useReducer } from 'react'
import Projectile from './Projectile'
import smash from '../../sounds/Smash.wav'
import { editM8, m8Profile } from '../../lib/api'
import { getPayload } from '../../lib/auth'
import { motion } from 'framer-motion'

function reducer(state, action) {
  if (action.type === 'ballisticFlight') {
    const time = state.time + 0.1
    const xPosition = state.xStartingVelocity * time + state.xStart
    const yPosition = (-0.5 * state.gravity * (time ** 2)) + (state.yStartingVelocity * time) + state.yStart
    let falling = true 
    if (!state.falling) {
      falling = 30 < state.yPosition
    }
    
    yPosition < state.yPosition
    return {
      ...state,
      xPosition: xPosition,
      yPosition: yPosition,
      time: time,
      falling: falling,
    }
  } else if (action.type === 'reset') {
    const newYStart = 0
    const newXStart = (Math.random() * 110) - 10
    console.log((newXStart + 10) / 110 * 6)
    return {
      xStart: newXStart,
      xPosition: newXStart,
      yPosition: newYStart,
      yStart: newYStart,
      time: 0,
      gravity: 0.25,
      xStartingVelocity: (Math.random() + 0.5) * -(((newXStart + 10) / 110 * 8) - 3),
      yStartingVelocity: (Math.random() * 2) + 4.6,
      falling: false,
    }
  } else if (action.type === 'smash') {
    return {
      ...state,
    }
  } else {
    return state
  }
}

export default function Game() {
  const [state, dispatch] = useReducer(
    reducer,
    { 
      yPosition: 0,
      xStart: 100,
      xPosition: 100,
      yStart: 0,
      time: 0,
      gravity: 0.25,
      xStartingVelocity: -3,
      yStartingVelocity: (Math.random() * 2) + 4,
      falling: false,
    }
  )
  const [isPlaying, setIsPlaying] = useState(true)
  const [intervalId, setIntervalId] = useState(0)
  const [platesCaught, setPlatesCaught] = useState(0)
  const height = 600
  const width = 800
  const [smashed, setSmashed] = useState(false)
  const [m8, setM8] = useState(false)
  const { m8Id } = getPayload()
  
  useEffect(() => {
    clearInterval(intervalId)
    if (!smashed) {
      setIntervalId(setInterval(() => {
        dispatch({ type: 'ballisticFlight' })  
      }, 10))
    }
    const getData = async () => {
      const { data } = await m8Profile(m8Id)
      setM8(data)
    }
    getData()
  }, [platesCaught])

  const newProjectile = () => {
    console.log('new')
    dispatch({ type: 'reset' })
  }

  const handleCatch = () => {
    if (smashed) return
    setPlatesCaught(platesCaught + 1)
    newProjectile()
  }

  const handleSmash = async () => {
    setSmashed(true)
    clearInterval(intervalId)
    dispatch({ type: 'smashed' })
    const audio = document.getElementById('smash')
    audio.src = smash
    audio.play()
    setTimeout(() => {
      setIsPlaying(false)
    }, 1000)
    if (m8.highScore < platesCaught) {
      console.log('here')
      await editM8(m8Id, { highScore: platesCaught })
    } 
  }

  const startGame = () => {
    setSmashed(false)
    setIsPlaying(true)
    newProjectile()
    setPlatesCaught(0)
  }


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }} 
      exit={{ opacity: 0 }}
    >
      <div className="game-page">
        {isPlaying ? 
          <div className="container">
            <div className="game-screen">
              <audio id="smash"/>
              <Projectile 
                className="projectile"
                handleCatch={handleCatch}
                handleSmash={handleSmash}
                xPosition={state.xPosition}
                yPosition={state.yPosition}
                height={height}
                width={width}
                falling={state.falling}
                smashed={smashed}
              />
            </div>
            <h1>Plates Caught: {platesCaught}</h1>
          </div>
          :
          <div className="apres">
            {smashed && <h1>You caught {platesCaught} plates</h1>}
            <button className="button" onClick={startGame}>Play{smashed ? ' again' : ''}</button>
          </div>
        }
      </div>
    </motion.div>
  )
}