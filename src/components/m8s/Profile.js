import { useState, useEffect } from 'react'
// import { useParams } from 'react-router'
import { m8Profile } from '../../lib/api'
import { getPayload } from '../../lib/auth'

export default function M8Show() {
  const { m8Id } = getPayload()
  const [m8, setM8] = useState(null)
  console.log(m8Id)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(m8Id)
        console.log(data)
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

              <div className="column is-5 is-offset-0">
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
                  <p className="title is-4">Throw a pl8 Highscore</p>
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
  
                <div className="columns">
                  <div className="column is-4 is-offset-0">
                    <div className="card">
                      <div className="card-image">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-left">
                            </div>
                            <div className="media-content">
                              <p className="title is-4">Chris</p>
                            </div>
                          </div>
                        </div>
                        <figure className="image is-4by3">
                          <img src="https://static.boredpanda.com/blog/wp-content/uploads/2020/10/rate-my-plate-facebook-group-5f7f126f135cc-png__700.jpg" alt={m8.username}/>
                        </figure>
                      </div>
                    </div>                 
                  </div>
                  <div className="column is-4 is-offset-0">
                    <div className="card">
                      <div className="card-image">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-left">
                            </div>
                            <div className="media-content">
                              <p className="title is-4">Dom</p>
                            </div>
                          </div>
                        </div>
                        <figure className="image is-4by3">
                          <img src="https://i2-prod.mirror.co.uk/incoming/article14433668.ece/ALTERNATES/s615b/0_Rate-My-Plate.jpg" alt={m8.username}/>
                        </figure>
                      </div>
                    </div>                 
                  </div>
                  <div className="column is-4 is-offset-0">
                    <div className="card">
                      <div className="card-image">
                        <div className="card-content">
                          <div className="media">
                            <div className="media-left">
                            </div>
                            <div className="media-content">
                              <p className="title is-4">Nick</p>
                            </div>
                          </div>
                        </div>
                        <figure className="image is-4by3">
                          <img src="https://static.boredpanda.com/blog/wp-content/uploads/2020/10/rate-my-plate-facebook-group-5f7f1377e3006-png__700.jpg" alt={m8.username}/>
                        </figure>
                      </div>
                    </div>                 
                  </div>
                  
                </div>
              </div>
              
            </div>
            <div className="media-content">
              <p className="title is-4">This m8&apos;s pl8&apos;s</p>
            </div>
            <br/>
            <div className="columns">
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="media-content">
              <p className="title is-4">This m8&apos;s faviourite pl8&apos;s</p>
            </div>
            <br/>
            <div className="columns">
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="column is-3 is-offset-0">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={m8.avatar} alt={m8.username}/>
                    </figure>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      }
    </section>
  )
}