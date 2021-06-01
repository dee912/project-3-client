export default function ProfileBio({ highScore,formdata, edit, handleChange }) {
  return (
    <div>
      <div className="media-content">
        <h2 className="subtitle">{formdata.username}&apos;s bio</h2>
      </div>
      <br/>
      <div className="media-content">
        {!edit && <p className="information">{!formdata.bio ? 'Add a description about yourself' : formdata.bio }</p>}
        {edit && <textarea className='title is-6' name='bio' value={formdata.bio} onChange={handleChange}/>}
      </div>
      <hr className="profileHr"/>
      <div className="media-content">
        <h2 className="subtitle">Throw a pl8 Highscore</h2>
      </div>
      <br/>
      <div className="media-content">
        <p className="information">{highScore}</p>
      </div>
    </div>
  )
}