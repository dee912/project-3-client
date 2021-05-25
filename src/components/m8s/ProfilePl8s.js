import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { getAllPl8s, m8Profile } from '../../lib/api'

export default function ProfilePl8s({ username }) {
  const { m8Id } = useParams()
  const [pl8, setPl8] = React.useState(null)
  const [m8, setM8] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const resPl8 = await getAllPl8s()
        const resM8 = await m8Profile(m8Id)
        setPl8(resPl8.data)
        setM8(resM8.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [m8Id])

  const ownPl8s = (pl8 && m8 && pl8.filter(pl8s => pl8s.m8 === m8._id))
  
  return (
    <section>
      <div className="media-content">
        <p className="title is-4">{username}&apos;s m8s</p>
      </div>
      <br/>
      <div className="containerScroll">
        {ownPl8s && (
          ownPl8s.map(ownPl8s => (
            <div key={ownPl8s._id} >
              <div  className="cardScroll">
                <Link to={`/pl8s/${ownPl8s._id}` } >
                  <p className="title is-4">{ownPl8s.name}</p>
                  <img className="friends" src={ownPl8s.image} alt={ownPl8s.username}/>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}