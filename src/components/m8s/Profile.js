import { useState, useEffect } from 'react'
import { m8Profile } from '../../lib/api'
import { getPayload } from '../../lib/auth'

export default function PL8Show() {
  const { m8Id } = getPayload()
  const [m8, setM8] = useState(null)
  console.log(m8Id)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(m8Id)
        setM8(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [m8Id])

  return (
    <section>
      { m8 &&
        <div className="section">
          <div className="container">
            <div className="columns">

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
                <div className="card">
                  <footer className="card-footer">
                    <a href="#" className="card-footer-item">Edit</a>
                    <a href="#" className="card-footer-item">Delete</a>
                  </footer>
                </div>
              </div>

              <div className="column is-7 is-offset-0">
                <div className="media-content">
                  <p className="title is-4">{m8.username}&apos;s bio</p>
                </div>
                <br/>
                <div className="media-content">
                  <p className="title is-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <br/>
                <div className="media-content">
                  <p className="title is-5">Throw a pl8 Highscore</p>
                </div>
                <br/>
                <div className="media-content">
                  <p className="title is-6">{m8.highScore}</p>
                </div>
                <br/>
                <div className="media-content">
                  <p className="title is-4">{m8.username}&apos;s m8&apos;s</p>
                </div>
                <br/>
                <div className="media-content">
                  <p className="title is-6"></p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      }
    </section>
  )
}