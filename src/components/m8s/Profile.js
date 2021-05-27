import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import useForm from '../../hooks/useForm'
import { deleteM8, editM8, m8Profile } from '../../lib/api'
import { isAuthenticated, isOwner,removeToken } from '../../lib/auth'
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
  const { formdata, setFormdata, handleChange } = useForm({
    username: '',
    avatar: '',
    highscore: '',
    r8dPl8s: [],
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(m8Id)
        setM8(data)
        setFormdata(data)
        setIsM8(m8Id === data._id)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [m8Id, setFormdata])

  const handleSave = async () => {
    setEdit(false)
    try {
      await editM8(m8Id, formdata)
    } catch (error) {
      console.log(error)
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
              <ProfilePic {...m8} setEdit={setEdit} edit={edit} handleChange={handleChange} formdata={formdata} handleSave={handleSave} setFormdata={setFormdata}/>
              {edit && isM8 && <button onClick={handleDelete}>Delete M8</button>}
              <div className="column is-7 is-offset-0">
                <ProfileBio {...m8} edit={edit} formdata={formdata} handleChange={handleChange} />
                <hr className="profileHr"/>
                <ProfileM8s formdata={formdata} />
              </div>
            </div>
            <hr className="profileHr"/>
            <ProfilePl8s {...m8} />
            <hr className="profileHr"/>
            <ProfileM8sPl8s {...m8} />
          </div>
          {isAuthenticated() && !isOwner(m8._id) && <button className='addM8'>Add M8</button>}
        </div>
        }
      </section>
    </motion.div>
  )
}