import React from 'react'
import { useParams } from 'react-router-dom'

import ProfileM8sCard from './ProfileM8sCard'
import { getAllM8s } from '../../lib/api'

export default function ProfileM8s({ username }) {
  const { m8Id } = useParams()
  const [m8, setM8] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllM8s(m8Id)
        setM8(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [m8Id])

  return (
    <div>
      <div className="media-content">
        <p className="title is-4">{username}&apos;s m8s</p>
      </div>
      <br/>

      {m8 && (
        m8.map(m8 => <ProfileM8sCard key={m8._id} {...m8} />)
      )}
    </div>
  )
}