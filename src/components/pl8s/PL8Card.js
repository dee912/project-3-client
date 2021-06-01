import { Link } from 'react-router-dom'

export default function PL8Card({ name, image, _id }) {
  return (
    <Link to={`/pl8s/${_id}`}>
      <div className="cardScroll index-card">
        <h2 className="title">{name}</h2>
        <img className="friends" src={image} alt="name"/>
      </div>  
    </Link>
  )
}