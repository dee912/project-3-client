import React from 'react'
import { Link } from 'react-router-dom'
import { deleteComment, editComment, m8Profile } from '../../lib/api'
import { isOwner } from '../../lib/auth'

export default function Pl8Comment({ comment, index, pl8Id, updating, setUpdating, setDeleted }) {
  const [m8, setM8] = React.useState(null)
  const [commentToEdit, setCommentToEdit] = React.useState(false)
  const [editedComment, setEditedComment] = React.useState(comment.text)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(comment.m8._id)
        setM8(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [comment.m8._id])

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

  const submitEdit = async () => {
    try {
      const { data } = await editComment(pl8Id, { text: editedComment }, comment._id)
      setEditedComment(data.text)
      comment.text = data.text
      endUpdating()
    } catch (error) {
      console.log(error)
    }
  }

  const submitDelete = async () => {
    try {
      await deleteComment(pl8Id, comment._id)
      setDeleted(true)
      endUpdating()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {index < 2 && m8 &&
        <div className='commentLayout'>
          <Link to={`/m8/${comment.m8._id}`} className='commentImage'>
            <img src={m8.avatar} alt={m8.username} />
          </Link>
          <p>{comment.text}</p>
          <div>
            {isOwner(comment.m8._id) && <button onClick={allowUpdating}>Edit</button>}
          </div>
        </div>
      }
      {index === 2 && <Link to={`/pl8s/${pl8Id}/comments`}>View all comments</Link>}
      {commentToEdit &&
        <div className='commentPopUp'>
          <h1>Edit the Comment</h1>
          <div className='enterText'>
            <textarea 
              value={editedComment} 
              maxLength='150' 
              onChange={(e) => setEditedComment(e.target.value)} 
            />
            <p>Reamaining Characters: {150 - editedComment.length}</p>
          </div>
          <div className='buttons'>
            <button onClick={endUpdating}>Cancel</button>
            <button onClick={submitEdit}>Update</button>
            <button onClick={submitDelete}>Delete</button>
          </div>
        </div>}
    </div>
  )
}