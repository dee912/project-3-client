import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { produce } from 'immer'
import useForm from '../../hooks/useForm'
import { cr8APl8 } from '../../lib/api'

export default function Cr8APl8() {
  const history = useHistory
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    origin: '',
    description: '',
    prepTime: 0,
    cookTime: 0,
    imgage: '',
  })
  const [ingredients, setIngredients] = useState([''])
  const [recipe, setRecipe] = useState([''])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await cr8APl8(formdata, ingredients, recipe)
      history.push(`/pl8s/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
  }

  console.log(ingredients)

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">PL8 name</label>
              <div className="control">
                <input
                  className={`input ${formErrors.name ? 'is-danger' : ''}`}
                  placeholder="PL8 name"
                  name="name"
                  onChange={handleChange}
                  value={formdata.name}
                />
                {formErrors.name && <p className="help is-danger">{formErrors.name}</p>}
              </div>
            </div>
            
            <div className="field">
              <label className="label">Origin</label>
              <div className="control">
                <input
                  className={`input ${formErrors.origin ? 'is-danger' : ''}`}
                  placeholder="Origin"
                  name="origin"
                  onChange={handleChange}
                  value={formdata.origin}
                />
                {formErrors.origin && <p className="help is-danger">{formErrors.origin}</p>}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  className={`input ${formErrors.description ? 'is-danger' : ''}`}
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={formdata.description}
                />
                {formErrors.description && <p className="help is-danger">{formErrors.description}</p>}
              </div>
            </div>
            <label className="label">Ingredient</label>
            {ingredients ? 
              ingredients.map((ingredient, i) => (
                <div className="field" key={i}>
                  <div className="control">
                    <input
                      className={`input ${formErrors.description ? 'is-danger' : ''}`}
                      placeholder={`Ingredient ${i + 1}`}
                      name="ingredient"
                      onChange={event => {
                        const newIngredient = event.target.value
                        setIngredients((currentIngredients) => {
                          produce(currentIngredients, (value) => {
                            console.log(value)
                            value[i] = newIngredient
                          })
                        })
                      }}
                      value={ingredient}
                    />
                  </div>
                </div>
              ))
              :
              console.log(ingredients)
            }
          </form>
        </div>
      </div>
    </section>
  )
}