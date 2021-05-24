import { useHistory } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { nanoid } from 'nanoid'
import useForm from '../../hooks/useForm'
import { cr8APl8 } from '../../lib/api'
import { useState } from 'react'

export default function Cr8APl8() {
  const history = useHistory
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    origin: '',
    description: '',
    ingredients: [],
    recipe: [''],
    prepTime: 0,
    cookTime: 0,
    imgage: '',
  })
  const [ids, setIds] = useState([nanoid()])

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    handleChange({ target: { name, value: selectedItems } })
  }

  const handleAddRecipeStepInput = () => {
    if (formdata.recipe[formdata.recipe.length - 1]) {
      handleChange({ target: { name: 'recipe', value: [...formdata.recipe, ''] } })
      setIds([...ids, nanoid()])
    }
  }

  const handleChangeRecipeStep = (event, i) => {
    console.log(event)
    const newArray = [...formdata.recipe]
    newArray[i] = event.target.value
    console.log(newArray[i])
    console.log(event.target.value)
    console.log(newArray)
    handleChange({ target: { name: 'recipe', value: newArray } })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await cr8APl8(formdata)
      history.push(`/pl8s/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
  }

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
            <div className="field">
              <label className="label">Ingredients</label>
              <CreatableSelect 
                isMulti
                name="ingredients"
                onChange={selected => 
                  handleMultiSelectChange(selected, 'ingredients')
                }
                value={formdata.ingredients.map(ingredient => ({ label: ingredient[0].toUpperCase() + ingredient.substring(1), value: ingredient }))}
              />
            </div>
            <div className="field">
              <label className="label">Recipe</label>
              {formdata.recipe.map((step, i) => (
                <input
                  key={ids[i]}
                  className={'input'}
                  placeholder="Add step"
                  name="recipe"
                  onChange={(event) => handleChangeRecipeStep(event, i)}
                  value={step}
                />
              ))}
              <button className="button" type="button" onClick={handleAddRecipeStepInput}>Add Step</button>
            </div>
            <div className="field">
              <label className="label">Prep Time (minutes)</label>
              <div className="control">
                <input
                  type="number"
                  name="prepTime"
                  min={0}
                  onChange={handleChange}
                  value={formdata.prepTime}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Cook Time (minutes)</label>
              <div className="control">
                <input
                  type="number"
                  name="cookTime"
                  min={0}
                  onChange={handleChange}
                  value={formdata.cookTime}
                />
              </div>
            </div>
            
            <button className="button is-fullwidth" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}