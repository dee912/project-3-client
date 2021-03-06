import { nanoid } from 'nanoid'
import CreatableSelect from 'react-select/creatable'
import ImageUpload from '../ImageUpload'
import { useState } from 'react'

export default function Pl8Form({ handleSubmit, formErrors, formdata, handleChange }) {

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
    const newArray = [...formdata.recipe]
    newArray[i] = event.target.value
    handleChange({ target: { name: 'recipe', value: newArray } })
  }

  const handleImageUpload = file => {
    handleChange({ target: { name: 'image', value: file } })
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label">PL8 name</label>
        <div className="control">
          <input
            className={`input ${formErrors.name ? 'invalid' : ''}`}
            placeholder="PL8 name"
            name="name"
            onChange={handleChange}
            value={formdata.name}
          />
          {formErrors.name && <p className="help invalid">{formErrors.name}</p>}
        </div>
      </div>

      <div className="field">
        <label className="label">Origin</label>
        <input
          className={`input ${formErrors.name ? 'invalid' : ''}`}
          placeholder="Origin"
          name="origin"
          onChange={handleChange}
          value={formdata.origin}
        />
        {formErrors.origin && <p className="help invalid">{formErrors.origin}</p>}
      </div>
      <div className="field">
        <label className="label">Description</label>
        <textarea
          className={`input ${formErrors.name ? 'invalid' : ''}`}
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={formdata.description}
        />
        {formErrors.description && <p className="help invalid">{formErrors.description}</p>}
      </div>
      <div className="field">
        <label className="label">Ingredients</label>
        <CreatableSelect
          isMulti
          className="multi-select"
          name="ingredients"
          onChange={selected =>
            handleMultiSelectChange(selected, 'ingredients')
          }
          value={formdata.ingredients.map(ingredient => ({ label: ingredient[0].toUpperCase() + ingredient.substring(1), value: ingredient }))}
        />
        {formErrors.ingredients && <p className="help invalid">{formErrors.ingredients}</p>}
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
        {formErrors.recipe && <p className="help invalid">{formErrors.recipe}</p>}
        <button className="small-button" type="button" onClick={handleAddRecipeStepInput}>Add Step</button>
      </div>
      <div className="times">
        <div className="field">
          <label className="label">Prep Time</label>
          <input
            type="number"
            placeholder="Minutes"
            name="prepTime"
            min={0}
            onChange={handleChange}
            value={formdata.prepTime}
          />
        </div>
        <div className="field">
          <label className="label">Cook Time</label>
          <input
            type="number"
            placeholder="Minutes"
            name="cookTime"
            min={0}
            onChange={handleChange}
            value={formdata.cookTime}
          />
        </div>
      </div>
      <ImageUpload onUpload={handleImageUpload} />
      <button className="button" onClick={handleSubmit}>Submit</button>
    </form>
  )
}