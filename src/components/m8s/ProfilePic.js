import { isOwner } from '../../lib/auth'
import ImageUpload from './ImageUpdate'


export default function ProfilePic({ _id, setEdit, edit, formdata, handleChange, handleSave, setFormdata }) {
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
                {edit && <input className='title is-4' name='username' value={formdata.username} onChange={handleChange} />}
              </div>
            </div>
          </div>
          <figure className="image is-4by3">
            {formdata.avatar ?
              <img src={formdata.avatar} alt={formdata.username} />
              :
              <img src="https://www.ramw.org/sites/default/files/styles/content/public/default_images/default_0.jpg?itok=TlxjusRt" alt={formdata.username} />}
          </figure>
        </div>
      </div>
      <div className="card">
        <footer className="card-footer">
          {isOwner(_id) && !edit && <button onClick={handleEdit} className="card-footer-item">Edit</button>}
          {edit &&
            <div className="card-footer-item">
              <ImageUpload setFormdata={setFormdata} formdata={formdata}/>
              <button className='card-footer-item' onClick={handleSave}>Save Changes</button>
            </div>}
        </footer>
      </div>
    </div>
  )
}