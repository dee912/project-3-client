import { Link } from 'react-router-dom'

export default function ProfileM8sCard({ _id, username, avatar }) {
  return (
    <Link to={`/m8/${_id}`}>
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
    </Link>
  )
}