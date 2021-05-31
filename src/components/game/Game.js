import { useState, useEffect, useReducer, useCallback } from 'react'
import Projectile from './Projectile'
import smash from '../../sounds/Smash.wav'


function reducer(state, action) {
  if (action.type === 'ballisticFlight') {
    const time = state.time + 0.1
    const xPosition = state.xStartingVelocity * time + state.xStart
    const yPosition = (-0.5 * state.gravity * (time ** 2)) + (state.yStartingVelocity * time) + state.yStart
    let falling = true 
    if (!state.falling) {
      falling = 10 < state.yPosition
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
  const [platesSmashed, setPlatesSmashed] = useState(0)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const [smashed, setSmashed] = useState(false)
  
  useEffect(() => {
    clearInterval(intervalId)
    if (!smashed) {
      setIntervalId(setInterval(() => {
        dispatch({ type: 'ballisticFlight' })  
      }, 10))
    }
  }, [platesCaught, platesSmashed])

  const newProjectile = () => {
    console.log('new')
    dispatch({ type: 'reset' })
  }

  const handleCatch = () => {
    setPlatesCaught(platesCaught + 1)
    newProjectile()
  }

  const handleSmash = () => {
    setPlatesSmashed(platesSmashed + 1)
    setSmashed(true)
    clearInterval(intervalId)
    dispatch({ type: 'smashed' })
    const audio = document.getElementById('smash')
    audio.src = smash
    audio.play()
    setTimeout(() => {
      setIsPlaying(false)
    }, 1000)
  }

  const startGame = () => {
    setSmashed(false)
    setIsPlaying(true)
    newProjectile()
    setPlatesCaught(0)
    setPlatesSmashed(0)

  }

  const gameScreen = useCallback(node => {
    try {
      setHeight(node.getBoundingClientRect().height)
      setWidth(node.getBoundingClientRect().width)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="game-page">
      {isPlaying ? 
        <>
          <div className="game-screen" ref={gameScreen}>
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
          <h1>Plates Caught: {platesCaught}        Plates Smashed: {platesSmashed}</h1>
        </>
        :
        <button onClick={startGame}>Play</button>
      }
    </div>
  )
}