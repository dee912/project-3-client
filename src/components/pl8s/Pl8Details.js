import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

export default function Pl8Details({ name, description, r8ings, meanR8ing, handleR8ing, r8ingOptions, origin, prepTime, cookTime, ingredients, recipe, m8 }) {
  console.log(m8)
  return (
    <>
      <h1 className="title is-1">{name}</h1>
      <h2 className="title is-3">Description:</h2>
      <p>{description}</p>
      <hr />
      <h2 className="title is-3">R8ing: {r8ings.length > 0 ?
        <span>{meanR8ing} outta 8</span>
        :
        <span>No r8ings yet</span>
      }</h2>
      {isAuthenticated() && <select
        onChange={handleR8ing}
      >
        {r8ingOptions.map(option => (
          <option
            key={option}
            value={option}
          >{option}</option>
        ))}
      </select>}
      <hr />
      <h2 className="title is-3">Origin:</h2>
      <p>{origin}</p>
      <hr />
      <h3 className="title is-5">Prep Time: {prepTime}</h3>
      <h3 className="title is-5">Cook Time: {cookTime}</h3>
      <ul><h2 className="title is-3">Ingredients:</h2>
        {ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <hr />
      <ol><h2 className="title is-3">Recipe:</h2>
        {recipe.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <hr />
      <h2 className="title is-3">Pl8 Maker:</h2>
      <Link to={m8.deleted ? '#' : `/m8/${m8._id}`}>{m8.deleted ? 'M8 is no longer with us' : m8.username}</Link>
      <hr />
    </>
  )
}