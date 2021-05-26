import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { getAllPl8s } from '../../lib/api'

export default function ProfilePl8s({ username }) {
  const { m8Id } = useParams()
  const [pl8, setPl8] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const resPl8 = await getAllPl8s()
        setPl8(resPl8.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [m8Id])
  
  

  return (
    <section>
      <div className="media-content">
        <p className="title is-4">{username}&apos;s rated pl8s</p>
      </div>
      <br/>
      <div className="containerScroll">
        {pl8 && pl8.length > 0 ? (
          pl8.map(pl8s => (
            <div key={pl8s._id} >
              <div  className="cardScroll">
                <Link to={`/pl8s/${pl8s._id}` } >
                  <p className="title is-4">{pl8s.name}</p>
                  <img className="friends" src={pl8s.image} alt={pl8s.username}/>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="cardScroll">
            <p className="title is-4">This m8&apos;s rated no pl8s</p>
            <img className="friends" src="https://i.kym-cdn.com/entries/icons/facebook/000/017/966/jordan-crying.jpg" alt="sad jordan"/>
          </div>)
        }
      </div>
    </section>
  )
}