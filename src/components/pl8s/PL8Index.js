import React, { useState } from 'react'
import PL8Card from './PL8Card'
import { getAllPl8s } from '../../lib/api'
import { motion } from 'framer-motion'

export default function PL8Index() {
  const [pl8s, setPl8s] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="cardIndex">
        <div className="container">
          <input
            className="input is-rounded"
            type="text"
            placeholder="Find pl8s"
            onChange={handleChange}
          />
          <div className="index">
            {pl8s && pl8s.filter((pl8) => {
              if (searchTerm === '') {
                return pl8
              } else if (pl8.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return pl8
              }
            }).map(pl8 => (
              <PL8Card
                key={pl8._id}
                {...pl8}
              />
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  )
}