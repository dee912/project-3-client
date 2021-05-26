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
  console.log('own plates:', ownPl8s && ownPl8s.length)
  
  return (
    <section>
      <div className="media-content">
        <p className="title is-4">{username}&apos;s pl8s</p>
      </div>
      <br/>
      <div className="containerScroll">
        {ownPl8s && ownPl8s.length > 0 ? (
          ownPl8s.map(ownPl8 => (
            <div key={ownPl8._id} >
              <div  className="cardScroll">
                <Link to={`/pl8s/${ownPl8._id}` } >
                  <p className="title is-4">{ownPl8.name}</p>
                  <img className="friends" src={ownPl8.image} alt={ownPl8.username}/>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="cardScroll">
            <p className="title is-4">This m8 has no pl8s</p>
            <img className="friends" src="https://i.kym-cdn.com/entries/icons/facebook/000/017/966/jordan-crying.jpg" alt="sad jordan"/>
          </div>)
        }
      </div>
    </section>
  )
}