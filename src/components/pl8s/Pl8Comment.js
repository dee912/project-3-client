import React from 'react'
import { Link } from 'react-router-dom'
import { m8Profile } from '../../lib/api'

export default function Pl8Comment({ comment, index, showPage }) {
  const [m8, setM8] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await m8Profile(comment.m8)
        setM8(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [comment.m8])
  return (
    <div>
      {showPage && index < 2 && m8 &&
        <div className='commentLayout'>
          <Link to={`/m8/${comment.m8}`} className='commentImage'>
            <img src={m8.avatar} alt={m8.username} />
          </Link>
          <p>{comment.text}</p>
        </div>
      }
      {index === 2 && <p>View all comments</p>}
    </div>
  )
}