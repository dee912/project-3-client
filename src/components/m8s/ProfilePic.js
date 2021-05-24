export default function ProfilePic({ username, avatar }) {
  return (
    <div className="column is-5 is-offset-0">
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
            {
              avatar ? 
                <img src={avatar} alt={username}/> 
                : 
                <img src="https://www.ramw.org/sites/default/files/styles/content/public/default_images/default_0.jpg?itok=TlxjusRt" alt="defualt picture"/>
            }
          </figure>
        </div>
      </div>
      <div className="card">
        <footer className="card-footer">
          <a href="#" className="card-footer-item">Edit</a>
        </footer>
      </div>
    </div>
  )
}