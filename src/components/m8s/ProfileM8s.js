import React from 'react'
import M8sCard from './M8sCard'

export default function ProfileM8s({ formdata, m8s, setM8 }) {



  return (
    <section>
      <div className="media-content">
        <p className="title is-4">{formdata.username}&apos;s m8s</p>
      </div>
      <br />
      <div className="containerScroll">
        {m8s && m8s.length > 0 ? (
          m8s.map(m8 => (
            <M8sCard key={m8} m8Id={m8} setNewM8={setM8}/>
          ))
        )
          :
          (
            <div className="cardScroll">
              <p className="title is-4">No m8s</p>
              <img className="friends" src="https://i.kym-cdn.com/entries/icons/facebook/000/017/966/jordan-crying.jpg" alt="sad jordan" />
            </div>)}
      </div>
    </section>
  )
}