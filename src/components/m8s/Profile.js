import { useState, useEffect } from 'react'
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
  console.log(m8Id)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(m8Id)
        console.log(data)
        setM8(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [m8Id])

  return (
    <section>
      { m8 &&
        <div className="section">
          <div className="container">
            <div className="columns">
              <ProfilePic {...m8}/>
              <div className="column is-7 is-offset-0">
                <ProfileBio {...m8}/>
                <hr/>
                <ProfileM8s {...m8}/>
              </div>
            </div>
            <hr/>
            <ProfilePl8s {...m8}/>
            <hr/>
            <ProfileM8sPl8s {...m8}/>
          </div>
        </div>
      }
    </section>
  )
}