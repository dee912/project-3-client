import React from 'react'
import { useHistory } from 'react-router-dom'
import { loginM8 } from '../../lib/api'
import { setToken } from '../../lib/auth'
import useForm from '../../hooks/useForm'
import { motion } from 'framer-motion'

export default function Login() {
  const history = useHistory()
  const [isError, setIsError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await loginM8(formdata)
      setToken(data.token)
      history.push('/pl8s')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }} 
      exit={{ opacity: 0 }}
    >
      <section className="section">
        <div className="container">
          <div className="columns">
            <form
              className="column is-half is-offset-one-quarter"
              onSubmit={handleSubmit}  
            >
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {isError && (
                <p className="help is-danger">
                Incorrect login details
                </p>
              )}
              <div className="field">
                <button type="submit" className='button is-fullwidth is-warning'>
                Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  )
}