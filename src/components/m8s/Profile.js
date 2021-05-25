import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import useForm from '../../hooks/useForm'
import { editM8, m8Profile } from '../../lib/api'
import ProfileBio from './ProfileBio'
import ProfileM8s from './ProfileM8s'
import ProfileM8sPl8s from './ProfileM8sPl8s'
import ProfilePic from './ProfilePic'
import ProfilePl8s from './ProfilePl8s'

export default function M8Show() {
  const { m8Id } = useParams()
  const [m8, setM8] = useState(null)
  const [edit, setEdit] = useState(false)
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
        console.log(data)
        setM8(data)
        setFormdata(data)
        console.log('mata', data._id)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [m8Id, setFormdata])

  const handleSave = async () => {
    setEdit(false)
    try {
      const response = await editM8(m8Id, formdata)
      console.log('response', response)
    } catch (error) {
      console.log(error)
      setFormdata({ ...m8 })
    }
  }

  return (
    <section>
      { m8 &&
        <div className="section">
          <div className="container">
            <div className="columns">
              <ProfilePic {...m8} setEdit={setEdit} edit={edit} handleChange={handleChange} formdata={formdata} handleSave={handleSave}/>
              <div className="column is-7 is-offset-0">
                <ProfileBio {...m8} edit={edit} formdata={formdata} handleChange={handleChange}/>
                <hr />
                <ProfileM8s formdata={formdata} />
              </div>
            </div>
            <hr />
            <ProfilePl8s {...m8} />
            <hr />
            <ProfileM8sPl8s {...m8} />
          </div>
        </div>
      }
    </section>
  )
}