import React from 'react'
import { useParams } from 'react-router'
import { editComment, getSinglePl8, deleteComment, addComment } from '../../lib/api'
import { Link } from 'react-router-dom'
import { isOwner } from '../../lib/auth'
import { isAuthenticated } from '../../lib/auth'
import { motion } from 'framer-motion'

function lastUpdated(date) {
  const dateArray = date.split('T')
  return dateArray[0]
}
export default function Pl8AllComments() {
  const { pl8Id } = useParams()
  const [pl8, setPl8] = React.useState(null)
  const [editing, setEditing] = React.useState(false)
  const [adding, setAdding] = React.useState(false)
  const [editingInfo, setEditingInfo] = React.useState(null)
  const [updatePage, setUpdatePage] = React.useState(false)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePl8(pl8Id)
        setPl8(data)
        setUpdatePage(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [pl8Id, updatePage])

  const startEditing = (e) => {
    setEditingInfo(e.target.value.split(','))
    setEditing(true)
  }

  const startAdding = () => {
    setEditingInfo('')
    setAdding(true)
  }
  const submitEdit = async () => {
    try {
      await editComment(pl8Id, { text: editingInfo[1] }, editingInfo[0])
      setEditing(false)
      setUpdatePage(true)
    } catch (error) {
      console.log(error)
    }
  }

  const submitDelete = async () => {
    try {
      await deleteComment(pl8Id, editingInfo[0])
      setEditing(false)
      setUpdatePage(true)
    } catch (error) {
      console.log(error)
    }
  }

  const submitComment = async () => {
    try {
      if (editingInfo !== '') {
        await addComment(pl8._id, { text: editingInfo })
        setUpdatePage(true)
      }
      setAdding(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }} 
      exit={{ opacity: 0 }}
    >
      {pl8 &&
        <div className='commentsPage'>
          <div className='topDisplay'>
            <h1>{pl8.name}</h1>
            <img src={pl8.image} alt={pl8.name} />
            <hr />
            {isAuthenticated() && <button onClick={!editing ? startAdding : ''}>Add Comment</button>}
          </div>
          <div className='mainContent'>
            {pl8.comments.map(comment => {
              return (<div key={comment._id} className='fullComment'>
                <div className='whoPosted'>
                  <Link to={comment.m8.deleted ? '#' : `/m8/${comment.m8._id}`} className='link'>
                    <img src={comment.m8.deleted ? 'https://i.stack.imgur.com/l60Hf.png' : comment.m8.avatar} className='imageLink' />
                    <h3 className='linkText'>{comment.m8.deleted ? 'Mystery M8' : comment.m8.username}</h3>
                  </Link>
                  <small>Last Updated: {lastUpdated(comment.updatedAt)}</small>
                </div>
                <div className='text'>
                  <p>{comment.text}</p>
                </div>
                <div className='editDiv'>
                  {isOwner(comment.m8._id) && <button value={[comment._id,comment.text]} onClick={!adding ? startEditing : '' }>Edit</button>}
                </div>
              </div>)
            })}
          </div>

          {editing &&
            <div className='commentPopUp'>
              <h1>Edit the Comment</h1>
              <div className='enterText'>
                <textarea value={editingInfo[1]} onChange={(e) => setEditingInfo([editingInfo[0], e.target.value])} />
                <p>Reamaining Characters: {150  - editingInfo[1].length}</p>
              </div>
              <div className='buttons'>
                <button onClick={() => setEditing(false)}>Cancel</button>
                <button onClick={submitEdit}>Update</button>
                <button onClick={submitDelete}>Delete</button>
              </div>
            </div>}

          {adding &&
            <div className='commentPopUp'>
              <h1>Add a Comment</h1>
              <div className='enterText'>
                <textarea maxLength='150' value={editingInfo} onChange={(e) => setEditingInfo(e.target.value)}/>
                <p>Remaining Characters: {150 - editingInfo.length}</p>
              </div>
              <div className='buttons'>
                <button onClick={() => setAdding(false)}>Cancel</button>
                <button onClick={submitComment}>Add!</button>
              </div>
            </div>}
        </div>}
    </motion.div>
  )
}