import { useHistory } from 'react-router'
import useForm from '../../hooks/useForm'
import { cr8APl8 } from '../../lib/api'

export default function Cr8APl8() {
  const history = useHistory
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    origin: '',
    ingredients: [],
    recipie: [],
    prepTime: 0,
    cookTime: 0,
    imgage: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await cr8APl8(formdata)
      history.push(`/pl8s/${data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
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
          </form>
        </div>
      </div>
    </section>
  )
}