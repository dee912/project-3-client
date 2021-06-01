import { useState, useEffect, useReducer } from 'react'
import Projectile from './Projectile'
import smash from '../../sounds/Smash.wav'
import { editM8, m8Profile } from '../../lib/api'
import { getPayload, isAuthenticated } from '../../lib/auth'
import { motion } from 'framer-motion'

const gameOverMessages = [
  'You couldn\'t catch Covid.', 
  'Get off our website unless you score better than that.',
  'Can you explain what you were going for, exactly?',
  'That\'s really awesome—especially for you.',
  'I’m sure you’re doing the best you can.',
  'I feel like I asked too much of you.',
  'You suck',
  'Ok I guess you\'re alright',
  'That\'s actually a decent score',
  'Almost impressive.',
  'You need to find something better to do.',
  'Get a hobby.',
  'Shouldn\'t you be doing something more productive?',
  'You\'re doing to be late for wherever you\'re supposed to be.',
  'What a waste of your time.',
  'Good job, I suppose...',
  'You should probably tell your family that you\'re not missing.',
  'Do you seriously have nothing better to do?',
  'If you have this much free time you should be playing Runescape.'
]

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
  const isLoggedIn = isAuthenticated()
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
    if (!m8 && isLoggedIn) {
      getData()
    }
  }, [platesCaught, intervalId, isLoggedIn, m8, m8Id, smashed])

  const newProjectile = () => {
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
    if (isLoggedIn && m8.highScore < platesCaught) {
      await editM8(m8Id, { highScore: platesCaught })
    } 
  }

  const startGame = () => {
    setSmashed(false)
    setIsPlaying(true)
    newProjectile()
    setPlatesCaught(0)
  }

  const gameOverMessage = () => {
    const index = Math.floor(platesCaught / 10)
    return (gameOverMessages[index < gameOverMessages.length ? index : gameOverMessages.length - 1])
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
            {smashed && (
              <>
                <h1>Score: {platesCaught} plates</h1>
                <h3>{gameOverMessage()}</h3>
              </>
            )}
            <button className="button" onClick={startGame}>Play{smashed ? ' again' : ''}</button>
          </div>
        }
      </div>
    </motion.div>
  )
}