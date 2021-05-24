import { isOwner } from '../../lib/auth'


export default function ProfilePic({ _id, setEdit, edit, formdata, handleChange, handleSave }) {
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
                {!edit && <p className="title is-4">{formdata.username}</p>}
                {edit && <input className='title is-4' name='username' value={formdata.username} onChange={handleChange}/>}
              </div>
            </div>
          </div>
          <figure className="image is-4by3">
            <img src={formdata.avatar} alt={formdata.username}/>
          </figure>
        </div>
      </div>
      <div className="card">
        <footer className="card-footer">
          {isOwner(_id) && !edit && <button onClick={handleEdit}className="card-footer-item">Edit</button>}
          {edit && <button className='card-footer-item' onClick={handleSave}>Save Changes</button>}
        </footer>
      </div>
    </div>
  )
}