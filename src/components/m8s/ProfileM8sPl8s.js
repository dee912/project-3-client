import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ProfilePl8s({ username, r8dPl8s }) {
  const { m8Id } = useParams()

  const findR8ing = (r8ings) => {
    return r8ings.find(r8ing => {
      return r8ing.m8 === m8Id
    })
  }
  
  return (
    <section>
      <div className="media-content">
        <h3 className="title is-4">{username}&apos;s r8ed pl8s</h3>
      </div>
      <br/>
      <div className="containerScroll">
        {r8dPl8s && r8dPl8s.length > 0 ? (
          r8dPl8s.map(pl8 => (
            <div key={pl8._id} >
              <div  className="cardScroll">
                <Link to={`/pl8s/${pl8._id}` } >
                  <p className="title is-4">{pl8.name}</p>
                  <img className="friends" src={pl8.image} alt={pl8.username}/>
                  <p>{findR8ing(pl8.r8ings).r8ing} outta 8</p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="cardScroll">
            <h5 className="title is-4">This m8&apos;s r8ed no pl8s</h5>
            <img className="friends" src="https://i.kym-cdn.com/entries/icons/facebook/000/017/966/jordan-crying.jpg" alt="sad jordan"/>
          </div>)
        }
      </div>
    </section>
  )
}