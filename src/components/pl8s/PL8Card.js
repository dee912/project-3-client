import { Link } from 'react-router-dom'

export default function PL8Card({ name, image, _id }) {
  return (
    <Link to={`/pl8s/${_id}`}>
      <div className="cardScroll">
        <h5 className="title">{name}</h5>
        <img className="friends" src={image} alt="name"/>
      </div>  
    </Link>
  )
}