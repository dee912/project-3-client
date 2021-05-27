import useForm from '../../hooks/useForm'
import { editPl8 } from '../../lib/api'
import Pl8Form from './Pl8Form'

export default function Pl8Edit({ name, description, origin, prepTime, cookTime, ingredients, recipe, image, toggleEdit, _id }) {
  const { formdata, handleChange } = useForm({
    name: name,
    origin: origin,
    description: description,
    ingredients: ingredients,
    recipe: recipe,
    prepTime: prepTime,
    cookTime: cookTime,
    image: image,
  })

  const { formErrors, setFormErrors } = useForm({
    name: '',
    origin: '',
    description: '',
    ingredients: [],
    recipe: [''],
    prepTime: 0,
    cookTime: 0,
    image: '',
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
  console.log(formErrors)

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