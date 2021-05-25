import React from 'react'
import { Link } from 'react-router-dom'
import { m8Profile } from '../../lib/api'
import { isOwner } from '../../lib/auth'

export default function Pl8Comment({ comment, index, showPage, pl8Id, updating, setUpdating }) {
  const [m8, setM8] = React.useState(null)
  const [commentToEdit, setCommentToEdit] = React.useState(false)
  const [editedComment, setEditedComment] = React.useState(comment.text)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(comment.m8)
        setM8(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [comment.m8])

  const allowUpdating = () => {
    if (!updating) {
      setUpdating(true)
      setCommentToEdit(true)
    }
  }
  const endUpdating = () => {
    setUpdating(false)
    setCommentToEdit(false)
  }

  return (
    <div>
      {showPage && index < 2 && m8 &&
        <div className='commentLayout'>
          <Link to={`/m8/${comment.m8}`} className='commentImage'>
            <img src={m8.avatar} alt={m8.username} />
          </Link>
          <p>{comment.text}</p>
          <div>
            {isOwner(comment.m8) && <button onClick={allowUpdating}>Edit</button>}
          </div>
        </div>
      }
      {index === 2 && <Link to={`/pl8/${pl8Id}/comments`}>View all comments</Link>}
      {commentToEdit &&
        <div className='commentPopUp'>
          <h1>Edit the Comment</h1>
          <div className='enterText'>
            <textarea value={editedComment}/>
            <p>Reamaining Characters: </p>
          </div>
          <div className='buttons'>
            <button onClick={endUpdating}>Cancel</button>
            <button>Update</button>
            <button>Delete</button>
          </div>
        </div>}
    </div>
  )
}