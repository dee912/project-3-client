import { Link } from 'react-router-dom'

export default function ProfileM8sCard({ _id, username, avatar }) {
  return (
    
    <section className="friends">
      <Link to={`/m8/${_id}`}>
        <div className="columns">
          <div className="column is-4 is-offset-0">
            <div className="card">
              <div className="card-image">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{username}</p>
                    </div>
                  </div>
                </div>
                <figure className="image is-4by3">
                  <img src={avatar} alt={username}/>
                </figure>
              </div>
            </div>                 
          </div>
        </div>
      </Link>
    </section>
  )
}