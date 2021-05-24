import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllM8s } from '../../lib/api'

export default function ProfileM8s({ username }) {
  const { m8Id } = useParams()
  const [m8, setM8] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllM8s(m8Id)
        setM8(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [m8Id])

  return (
    <section>
      <div className="media-content">
        <p className="title is-4">{username}&apos;s m8s</p>
      </div>
      <br/>

      {m8 && (
        m8.map(m8 => (
          <div className="friends" key={m8._id}>
            <Link to={`/m8/${m8._id}`} >
              <div className="columns" >
                <div className="column is-4 is-offset-0">
                  <div className="card">
                    <div className="card-image">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                          </div>
                          <div className="media-content">
                            <p className="title is-4">{m8.username}</p>
                          </div>
                        </div>
                      </div>
                      <figure className="image is-4by3">
                        <img src={m8.avatar} alt={m8.username}/>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </section>
  )
}