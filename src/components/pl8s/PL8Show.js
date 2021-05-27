import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { cr8R8ing, upd8R8ing } from '../../lib/api'
import { deletePl8 } from '../../lib/api'
import { getSinglePl8, addComment } from '../../lib/api'
import { getPayload } from '../../lib/auth'
import { motion } from 'framer-motion'


const r8ingOptions = []
for (let i = 0; i < 9; i++) {
  r8ingOptions.push(i)
}
import { isAuthenticated } from '../../lib/auth'
import Pl8Details from './Pl8Details'
import Pl8Comment from './Pl8Comment'
import Pl8Edit from './Pl8Edit'

export default function PL8Show() {
  const history = useHistory()
  const { pl8Id } = useParams()
  const { m8Id } = getPayload()
  const [pl8, setPl8] = useState(null)
  const [commentToAdd, setCommentToAdd] = useState(false)
  const [meanR8ing, setMeanR8ing] = useState(0)
  const [writtenComment, setWrittenComment] = useState('')
  const [updating, setUpdating] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleR8ing = (event) => {
    const oldR8ing = pl8.r8ings.find(r8ing => {
      return r8ing.m8 === m8Id
    })
    const newR8ing = async () => {
      if (!oldR8ing) {
        const { data } = await cr8R8ing(pl8Id, { r8ing: event.target.value })
        setPl8({ ...data })
        calculateMeanR8ing([...data.r8ings])
      } else {
        const { data } = await upd8R8ing(pl8Id, oldR8ing._id, { r8ing: event.target.value })
        setPl8({ ...data })
        calculateMeanR8ing([...data.r8ings])
      }
    }
    newR8ing()
  }

  const calculateMeanR8ing = (r8ings) => {
    const mean = r8ings.reduce((acc, r8ing) => {
      return acc + Number(r8ing.r8ing)
    }, 0) / r8ings.length
    setMeanR8ing(mean)
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePl8(pl8Id)
        setDeleted(false)
        setPl8(data)
        calculateMeanR8ing(data.r8ings)
        setIsOwner(data.m8._id === m8Id)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [pl8Id, deleted, edit, m8Id])

  const handleInput = (e) => {
    setWrittenComment(e.target.value)
  }

  const submitComment = async () => {
    try {
      if (writtenComment !== '') {
        await addComment(pl8._id, { text: writtenComment })
        setDeleted(true)
        setWrittenComment('')
      }
      endUpdating()
    } catch (error) {
      console.log(error)
    }
  }

  const allowUpdating = () => {
    if (!updating) {
      setUpdating(true)
      setCommentToAdd(true)
    }
  }
  const endUpdating = () => {
    setUpdating(false)
    setCommentToAdd(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this Pl8?')) {
      await deletePl8(pl8._id)
      history.push('/pl8s')
    }
  }

  const toggleEdit = () => {
    setEdit(!edit)
  }
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }} 
      exit={{ opacity: 0 }}
    >
      <div className="showCard">
        
        <div className="container">
          {pl8 && (
            <div className="columns">
              <div className="column is-half">
                {!edit ?
                  <Pl8Details 
                    { ...pl8 }
                    r8ingOptions={r8ingOptions}
                    meanR8ing={meanR8ing}
                    handleR8ing={handleR8ing}
                  />
                  :
                  <Pl8Edit
                    { ...pl8 }
                    toggleEdit={toggleEdit}
                  />
                }
                {isOwner && 
              <>
                <button onClick={handleDelete}>Delete Pl8</button>
                {!edit && <button onClick={toggleEdit}>Edit Pl8</button>}
              </>
                }
              </div>
              <div className="column is-quarter">
                <div className="cardProfile">
                  <img className='showImage' src={pl8.image} alt={pl8.name} />
                </div>
                
                <br />
                <h3 className='title is-3 commentTitle'>Comments {isAuthenticated() && <button onClick={allowUpdating}>Add Comment</button>}</h3>
                <hr />
                {pl8.comments.map((comment, index) => (
                  <div key={comment._id}>
                    <Pl8Comment 
                      comment={comment} 
                      index={index} 
                      pl8Id={pl8Id} 
                      updating={updating} 
                      setUpdating={setUpdating} 
                      setDeleted={setDeleted}/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {commentToAdd &&
        <div className='commentPopUp'>
          <h1>Add a Comment</h1>
          <div className='enterText'>
            <textarea 
              maxLength='150' 
              onChange={handleInput} 
              value={writtenComment}
            />
            <p>Remaining Characters: {150 - writtenComment.length}</p>
          </div>
          <div className='buttons'>
            <button onClick={endUpdating}>Cancel</button>
            <button onClick={submitComment}>Add!</button>
          </div>
        </div>}
        </div>
      </div>
      
    </motion.div>
    
  )
}