import { Link } from 'react-router-dom'

export default function PL8Card({ name, image, _id }) {
  return (
    <Link to={`/pl8s/${_id}`}>
      <div className="list">
        <h5 className="title">{name}</h5>
        <img className="index-img" src={image} alt="name"/>
      </div>  
    </Link>
  )
}