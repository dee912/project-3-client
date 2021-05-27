import { useState, useEffect, useReducer, useCallback } from 'react'
import Projectile from './Projectile'
import { motion } from 'framer-motion'


function reducer(state, action) {
  if (action.type === 'ballisticFlight') {
    const time = state.time + 0.1
    const xPosition = state.xStartingVelocity * time + state.xStart
    const yPosition = (-0.5 * state.gravity * (time ** 2)) + (state.yStartingVelocity * time) + state.yStart
    return {
      ...state,
      xPosition: xPosition,
      yPosition: yPosition,
      time: time,
    }
  } else if (action.type === 'reset') {
    const newYStart = 0
    return {
      xStart: -10,
      xPosition: -10,
      yPosition: newYStart,
      yStart: newYStart,
      time: 0,
      gravity: 0.25,
      xStartingVelocity: 2,
      yStartingVelocity: Math.random() + 4.2,
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
      xStart: -10,
      xPosition: -10,
      yStart: 0,
      time: 0,
      gravity: 0.25,
      xStartingVelocity: 2,
      yStartingVelocity: Math.random() + 4.2,
    }
  )
  const [isPlaying, setIsPlaying] = useState(true)
  const [intervalId, setIntervalId] = useState(0)
  const [platesCaught, setPlatesCaught] = useState(0)
  const [platesSmashed, setPlatesSmashed] = useState(0)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  
  useEffect(() => {
    clearInterval(intervalId)
    setIntervalId(setInterval(() => {
      dispatch({ type: 'ballisticFlight' })  
    }, 10))
  }, [platesCaught, platesSmashed])

  const newProjectile = () => {
    dispatch({ type: 'reset' })
  }

  const handleCatch = () => {
    setPlatesCaught(platesCaught + 1)
    newProjectile()
  }

  const handleSmash = () => {
    setPlatesSmashed(platesSmashed + 1)
    newProjectile()
  }

  const startGame = () => {
    setIsPlaying(true)
  }

  const gameScreen = useCallback(node => {
    setHeight(node.getBoundingClientRect().height)
    setWidth(node.getBoundingClientRect().width)
  }, [])

  return (
    <>
      {isPlaying ? 
        <>
          <div className="game" ref={gameScreen}>
            <Projectile 
              handleCatch={handleCatch}
              handleSmash={handleSmash}
              xPosition={state.xPosition}
              yPosition={state.yPosition}
              height={height}
              width={width}
            />
          </div>
          <h1>Plates Caught: {platesCaught}        Plates Smashed: {platesSmashed}</h1>
        </>
        :
        <button onClick={startGame}>Play</button>
      }
    </>
  )
}