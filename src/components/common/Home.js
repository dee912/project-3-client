import React from 'react'

export default function Home() {
  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])
  const [grow, setGrow] = React.useState(false)
  const [clicks, setClicks] = React.useState(0)
  const handleClick = () => {
    setGrow(true)
    setClicks(clicks + 1)
  }
  return (
    <div className='background'>
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
        {clicks >= 8 && <button>View Pl8s</button>}
      </div>
    </div>
  )
}

// M 50 50 L 15.72 45.82
// M 50 50 L 50 84.541
// M 50 50 L 85.124 42.639
// M 50 50 L 42.041 15.918

// M 0 50 A 50 50 0 0 0 50 100
// M 50 100 A 50 50 0 0 0 100 50
// M 100 50 A 50 50 0 0 0 50 0
// M 50 0 A 50 50 0 0 0 0 50

// M 0 50 L 20 45 L 25 30 L 50 50
// M 50 100 L 50 80 L 40 70 L 50 50
// M 100 50 L 80 40 L 70 60 L 50 50
// M 50 0 L 40  20 L 55 30 L 50 35 L 50 50

// M 15.72 45.82 A 35 35 0 0 0 50 84.541
// M 50 84.541 A 35 35 0 0 0 85.124 42.639
// M 85.124 42.639 A 35 35 0 0 0 42.041 15.918
// M 42.041 15.918 A 35 35 0 0 0 15.72 45.82

// https://mavo.io/demos/svgpath/

{/* <g className='cracks'>
          <path d="
          M 0 50 L 20 45 L 25 30 L 50 50"/>
          <path d="
          M 50 100 L 50 80 L 40 70 L 50 50"/>
          <path d="
          M 100 50 L 80 40 L 70 60 L 50 50"/>
          <path d="
          M 50 0 L 40  20 L 55 30 L 50 35 L 50 50"/>
        </g> */}