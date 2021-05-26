import React from 'react'
import { useParams } from 'react-router'
import { getSinglePl8 } from '../../lib/api'

export default function Pl8AllComments() {
  const { pl8Id } = useParams()
  const [pl8, setPl8] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePl8(pl8Id)
        setPl8(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [pl8Id])

  return (
    <>
      {pl8 && <div className='fullComment'>
        {pl8.comments.map(comment => {
          return (<div key={comment._id}>
            <h1>{comment.text}</h1>
          </div>)
        })}

      </div>}
    </>
  )
}