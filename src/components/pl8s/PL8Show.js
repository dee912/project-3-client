import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePl8 } from '../../lib/api'

const r8ingOptions = []
for (let i = 0; i < 9; i++) {
  r8ingOptions.push(i)
}
console.log(r8ingOptions)

export default function PL8Show() {
  const { pl8Id } = useParams()
  const [pl8, setPl8] = useState(null)
  console.log(pl8Id)

  const handleR8ing = (event) => {
    console.log(event.target.value)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSinglePl8(pl8Id)
        console.log(data)
        setPl8(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [pl8Id])

  return (
    <div className="container">
      {pl8 && (
        <div className="columns">
          <div className="column is-half">
            <h1 className="title is-1">{pl8.name}</h1>
            <h3 className="title is-3">Description:</h3>
            <p>{pl8.description}</p>
            <hr />
            <h3 className="title is-3">R8ing: {pl8.r8ings.length > 0 ?
              <span>{pl8.r8ings.reduce((r8ing, acc) => {
                return acc + r8ing.r8ing
              }, 0) / pl8.r8ings.length} outta 8</span>
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
            <h3 className="title is-3">Origin:</h3>
            <p>{pl8.origin}</p>
            <hr />
            <h5 className="title is-5">Prep Time: {pl8.prepTime}</h5>
            <h5 className="title is-5">Cook Time: {pl8.cookTime}</h5>
            <ul><h3 className="title is-3">Ingredients:</h3>
              {pl8.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <hr />
            <ol><h3 className="title is-3">Ingredients:</h3>
              {pl8.recipe.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="column is-half">
            <img src={pl8.image} alt={pl8.name}/>
          </div>
        </div>
      )}
    </div>
  )
}