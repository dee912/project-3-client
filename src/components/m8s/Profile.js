import { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { m8Profile } from '../../lib/api'
import { getPayload } from '../../lib/auth'
import ProfileBio from './ProfileBio'
import ProfileM8s from './ProfileM8s'
import ProfileM8sPl8s from './ProfileM8sPl8s'
import ProfilePic from './ProfilePic'
import ProfilePl8s from './ProfilePl8s'

export default function M8Show() {
  const { m8Id } = getPayload()
  const [m8, setM8] = useState(null)
  const [edit, setEdit] = useState(false)
  const { formdata, setFormdata } = useForm({
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

  const handleInput = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value })
  }

  return (
    <section>
      { m8 &&
        <div className="section">
          <div className="container">
            <div className="columns">
              <ProfilePic {...m8} setEdit={setEdit} edit={edit} handleInput={handleInput} formdata={formdata}/>
              <div className="column is-7 is-offset-0">
                <ProfileBio {...m8} edit={edit} formdata={formdata} handleInput={handleInput}/>
                <hr />
                <ProfileM8s {...m8} />
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