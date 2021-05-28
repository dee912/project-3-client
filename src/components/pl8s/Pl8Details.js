import { Link } from 'react-router-dom'

export default function Pl8Details({ name, description, r8ings, meanR8ing, handleR8ing, r8ingOptions, origin, prepTime, cookTime, ingredients, recipe, m8 }) {
  console.log(m8)
  return (
    <>
      <h1 className="title is-1">{name}</h1>
      <h3 className="title is-3">Description:</h3>
      <p>{description}</p>
      <hr />
      <h3 className="title is-3">R8ing: {r8ings.length > 0 ?
        <span>{meanR8ing} outta 8</span>
        :
        <span>No r8ings yet</span>
      }</h3>
      <select
        onChange={handleR8ing}
      >
        {r8ingOptions.map(option => (
          <option
            key={option}
            value={option}
          >{option}</option>
        ))}
      </select>
      <hr />
      <h3 className="title is-3">Origin:</h3>
      <p>{origin}</p>
      <hr />
      <h5 className="title is-5">Prep Time: {prepTime}</h5>
      <h5 className="title is-5">Cook Time: {cookTime}</h5>
      <ul><h3 className="title is-3">Ingredients:</h3>
        {ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <hr />
      <ol><h3 className="title is-3">Recipe:</h3>
        {recipe.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <hr />
      <h3 className="title is-3">Pl8 Maker:</h3>
      <Link to={ m8.deleted ? '#' : `/m8/${m8._id}`}>{m8.deleted ? 'M8 is no longer with us' : m8.username}</Link>
      <hr />
    </>
  )
}