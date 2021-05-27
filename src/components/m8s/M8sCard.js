import { Link } from 'react-router-dom'
import { m8Profile, removeM8 } from '../../lib/api'
import React from 'react'

export default function M8sCard({ m8Id, setNewM8 }) {
  const [m8, setM8] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(m8Id)
        setM8(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [m8Id])

  const removingM8 = async () => {
    try {
      const { data } = await removeM8(m8._id)
      setNewM8(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {m8 && <div className="cardScroll">
        <div className='m8Remover'>
          <button onClick={removingM8}>X</button>
        </div>
        <Link to={`/m8/${m8._id}`} >
          <p className="title is-4">{m8.username}</p>
          <img className="friends" src={m8.avatar} alt={m8.username} />
        </Link>
      </div>}
    </>

  )
}