export default function ProfilePl8s({ avatar, username }) {
  return (
    <div>
      <div className="media-content">
        <p className="title is-4">This m8&apos;s pl8&apos;s</p>
      </div>
      <br/>
      <div className="columns">
        <div className="column is-3 is-offset-0">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={avatar} alt={username}/>
              </figure>
            </div>
          </div>
        </div>
        <div className="column is-3 is-offset-0">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={avatar} alt={username}/>
              </figure>
            </div>
          </div>
        </div>
        <div className="column is-3 is-offset-0">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={avatar} alt={username}/>
              </figure>
            </div>
          </div>
        </div>
        <div className="column is-3 is-offset-0">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={avatar} alt={username}/>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}