import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import useForm from '../../hooks/useForm'
import { addNewM8, deleteM8, editM8, m8Profile, removeM8 } from '../../lib/api'
import { getPayload, isAuthenticated, isOwner,removeToken } from '../../lib/auth'
import ProfileBio from './ProfileBio'
import ProfileM8s from './ProfileM8s'
import ProfileM8sPl8s from './ProfileM8sPl8s'
import ProfilePic from './ProfilePic'
import ProfilePl8s from './ProfilePl8s'
import { motion } from 'framer-motion'

export default function M8Show() {
  const history = useHistory()
  const { m8Id } = useParams()
  const [m8, setM8] = useState(null)
  const [edit, setEdit] = useState(false)
  const [isM8, setIsM8] = useState(false)
  const [userM8, setUserM8] = useState(getPayload())
  const [alreadyAdded, setAlreadyAdded] = useState(false)
  const [nameTaken, setNameTaken] = useState({ username: '' })
  const { formdata, setFormdata, handleChange } = useForm({
    username: '',
    avatar: '',
    highscore: '',
    r8dPl8s: [],
  })

  if (userM8.m8s && m8 && !alreadyAdded) {
    const inList = userM8.m8s.find(user => m8._id === user)
    if (inList) {
      setAlreadyAdded(true)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(m8Id)
        if (userM8.m8Id) {
          const response = await m8Profile(userM8.m8Id)
          setUserM8(response.data)
        }
        setM8(data)
        setFormdata(data)
        setIsM8(m8Id === data._id)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [m8Id, setFormdata, userM8])

  const handleSave = async () => {
    setEdit(false)
    try {
      await editM8(m8Id, formdata)
    } catch (error) {
      setNameTaken({ ...nameTaken, ...error.response.data })
      setFormdata({ ...m8 })
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      await deleteM8(m8Id)
      history.push('/')
      removeToken()
    }
  }

  const addM8 = async () => {
    try {
      const { data } = await addNewM8({ m8: m8._id })
      setUserM8({ ...data })
    } catch (error) {
      console.log(error)
    }
  }
  const removingM8 = async () => {
    try {
      const { data } = await removeM8(m8._id)
      setUserM8({ ...data })
      setAlreadyAdded(false)
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
      <section className="profilePage">
        { m8 &&
        <div className="section">
          <div className="container">
            <div className="columns">
              <ProfilePic 
                {...m8} 
                setEdit={setEdit} 
                edit={edit} 
                handleChange={handleChange} 
                formdata={formdata} 
                handleSave={handleSave} 
                setFormdata={setFormdata}
                nameTaken={nameTaken}
                setNameTaken={setNameTaken}
              />
              {edit && isM8 && <button onClick={handleDelete}>Delete M8</button>}
              <div className="column is-7 is-offset-0">
                <ProfileBio 
                  {...m8} 
                  edit={edit} 
                  formdata={formdata} 
                  handleChange={handleChange} 
                />
                <hr />
                <ProfileM8s formdata={formdata} m8s={m8.m8s} setM8={setM8}/>
              </div>
            </div>
            <hr className="profileHr"/>
            <ProfilePl8s {...m8} />
            <hr className="profileHr"/>
            <ProfileM8sPl8s {...m8} />
          </div>
          {isAuthenticated() && !isOwner(m8._id) && !alreadyAdded && <button className='addM8' onClick={addM8}>Add M8</button>}
          {isAuthenticated() && !isOwner(m8._id) && alreadyAdded && <button className='removeM8' onClick={removingM8}>Remove M8</button>}
        </div>
        }
      </section>
    </motion.div>
  )
}