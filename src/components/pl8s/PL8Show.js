import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { cr8R8ing, upd8R8ing } from '../../lib/api'
import { getSinglePl8, addComment } from '../../lib/api'
import { getPayload } from '../../lib/auth'

const r8ingOptions = []
for (let i = 0; i < 9; i++) {
  r8ingOptions.push(i)
}
import { isAuthenticated } from '../../lib/auth'
import Pl8Comment from './Pl8Comment'

export default function PL8Show() {
  const { pl8Id } = useParams()
  const { m8Id } = getPayload()
  const [pl8, setPl8] = useState(null)
  const [commentToAdd, setCommentToAdd] = useState(false)
  const [meanR8ing, setMeanR8ing] = useState(0)
  const [writtenComment, setWrittenComment] = useState('')
  const [updating, setUpdating] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleR8ing = (event) => {
    const oldR8ing = pl8.r8ings.find(r8ing => {
      console.log(r8ing.m8 === m8Id)
      return r8ing.m8 === m8Id
    })
    console.log(oldR8ing)
    console.log('m8Id', m8Id)
    console.log(pl8)
    const newR8ing = async () => {
      if (!oldR8ing) {
        calculateMeanR8ing([...pl8.r8ings, event.target.value])
        await cr8R8ing(pl8Id, { r8ing: event.target.value })
      } else {
        console.log('oldr8ingId', oldR8ing._id)
        const { data } = await upd8R8ing(pl8Id, oldR8ing._id, { r8ing: event.target.value })
        setPl8({ ...data })
        console.log({ ...data.r8ings })
        calculateMeanR8ing([...data.r8ings])
      }
    }
    newR8ing()
  }

  const calculateMeanR8ing = (r8ings) => {
    const mean = r8ings.reduce((acc, r8ing) => {
      return acc + r8ing.r8ing
    }, 0) / r8ings.length
    setMeanR8ing(mean)
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePl8(pl8Id)
        console.log(data)
        setDeleted(false)
        setPl8(data)
        calculateMeanR8ing(data.r8ings)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [pl8Id, deleted])

  const handleInput = (e) => {
    setWrittenComment(e.target.value)
  }

  const submitComment = async () => {
    try {
      if (writtenComment !== '') {
        const { data } = await addComment(pl8._id, { text: writtenComment })
        setPl8({ ...data })
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

  return (
    <div className="container">
      {pl8 && (
        <div className="columns">
          <div className="column is-half">
            <h1 className="title is-1">{pl8.name}</h1>
            <h3 className="title is-3">Description:</h3>
            <p>{pl8.description}</p>
            <hr />
            <h3 className="title is-3">R8ing: {pl8.r8ings.length > 0 ?
              <span>{meanR8ing} outta 8</span>
              :
              <span>No r8ings yet</span>
            }</h3>
            <select
              onChange={handleR8ing}
            >
              {r8ingOptions.map(option => (
                <option
                  key={option}
                  value={option}
                >{option}</option>
              ))}
            </select>
            <hr />
            <h3 className="title is-3">Origin:</h3>
            <p>{pl8.origin}</p>
            <hr />
            <h5 className="title is-5">Prep Time: {pl8.prepTime}</h5>
            <h5 className="title is-5">Cook Time: {pl8.cookTime}</h5>
            <ul><h3 className="title is-3">Ingredients:</h3>
              {pl8.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <hr />
            <ol><h3 className="title is-3">Recipe:</h3>
              {pl8.recipe.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <hr />
            <h3 className="title is-3">Owner:</h3>
            <p>{pl8.m8.username}</p>
            <hr />
          </div>
          <div className="column is-quarter">
            <img className='showImage' src={pl8.image} alt={pl8.name} />
            <br />
            <h3 className='title is-3 commentTitle'>Comments {isAuthenticated() && <button onClick={allowUpdating}>Add Comment</button>}</h3>
            <hr />
            {pl8.comments.map((comment, index) => (
              <div key={comment._id}><Pl8Comment comment={comment} index={index} pl8Id={pl8Id} updating={updating} setUpdating={setUpdating} setDeleted={setDeleted}/></div>
            ))}
          </div>
        </div>
      )}
      {commentToAdd &&
        <div className='commentPopUp'>
          <h1>Add a Comment</h1>
          <div className='enterText'>
            <textarea maxLength='150' onChange={handleInput} value={writtenComment}/>
            <p>Remaining Characters: {150 - writtenComment.length}</p>
          </div>
          <div className='buttons'>
            <button onClick={endUpdating}>Cancel</button>
            <button onClick={submitComment}>Add!</button>
          </div>
        </div>}
    </div>
  )
}