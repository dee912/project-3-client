import { Link } from 'react-router-dom'

export default function PL8Card({ name, image, _id }) {
  return (
    <Link to={`/pl8s/${_id}`}>
      <div className="column is-third">
        <h3 className="title is-3">{name}</h3>
        <img src={image} alt="name"/>
      </div>  
    </Link>
  )
}