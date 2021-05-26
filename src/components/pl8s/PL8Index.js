import React, { useState } from 'react'
import PL8Card from './PL8Card'
import { getAllPl8s } from '../../lib/api'

export default function PL8Index() {
  const [pl8s, setPl8s] = useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllPl8s()
        setPl8s(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div className="container">
      <div className="columns">
        {pl8s && pl8s.map(pl8 => (
          <PL8Card
            key={pl8._id}
            {...pl8}
          />
        ))}
      </div>
    </div>
  )
}