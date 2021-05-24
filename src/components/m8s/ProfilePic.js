import { isOwner } from '../../lib/auth'


export default function ProfilePic({ _id, username, avatar, setEdit, edit, formdata, handleInput }) {
  const handleEdit = () => {
    setEdit(true)
  }
  return (
    <div className="column is-5 is-offset-0">
      <div className="card">
        <div className="card-image">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
              </div>
              <div className="media-content">
                {!edit && <p className="title is-4">{username}</p>}
                {edit && <input className='title is-4' id='username' value={formdata.username} onChange={handleInput}/>}
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
          {isOwner(_id) && !edit && <button onClick={handleEdit}className="card-footer-item">Edit</button>}
          {edit && <button className='card-footer-item' onClick={() => setEdit(false)}>Save Changes</button>}
        </footer>
      </div>
    </div>
  )
}