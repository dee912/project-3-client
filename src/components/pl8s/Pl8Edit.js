import useForm from '../../hooks/useForm'
import { editPl8 } from '../../lib/api'
import Pl8Form from './Pl8Form'

export default function Pl8Edit({ name, description, origin, prepTime, cookTime, ingredients, recipe, image, toggleEdit, _id }) {
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: name,
    origin: origin,
    description: description,
    ingredients: ingredients,
    recipe: recipe,
    prepTime: prepTime,
    cookTime: cookTime,
    image: image,
  })

  const handleSubmit = async () => {
    console.log('submit')
    toggleEdit()
    try {
      await editPl8(_id, formdata)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Pl8Form
      formdata={formdata}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setFormErrors={setFormErrors}
    />
  )
}