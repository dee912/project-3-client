import React from 'react'
import useForm from '../../hooks/useForm'
import { registerM8 } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import ImageUpload from '../ImageUpload'
import { motion } from 'framer-motion'

export default function Register() {
  const history = useHistory()
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    avatar: '',
  })
  
  const handleImageUpload = file => {
    handleChange({ target: { name: 'avatar', value: file } })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!formdata.passwordConfirmation) {
      setFormErrors({ ...formErrors, passwordConfirmation: 'The passwords need to match' })
      return
    }
    try {
      if (!formdata.avatar) {
        await registerM8({ ...formdata, avatar: 'https://i.stack.imgur.com/l60Hf.png' })
      } else {
        await registerM8(formdata)
      }
      history.push('/login')
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data })
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
          <div className="form">
            <form
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${formErrors.username ? 'invalid' : ''}`}
                    placeholder="Username"
                    onChange={handleChange}
                    name="username"
                    value={formdata.username}
                  />
                </div>
                {formErrors.username && (
                  <p className="help invalid">{formErrors.username}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${formErrors.email ? 'invalid' : ''}`}
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={formdata.email}
                  />
                </div>
                {formErrors.email && <p className="help invalid">{formErrors.email}</p>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${formErrors.password ? 'invalid' : ''}`}
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={formdata.password}
                  />
                </div>
                {formErrors.password && (
                  <p className="help invalid">{formErrors.password}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${
                      formErrors.passwordConfirmation ? 'invalid' : ''
                    }`}
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    name="passwordConfirmation"
                    value={formdata.passwordConfirmation}
                  />
                </div>
                {formErrors.passwordConfirmation && (
                  <p className="help invalid">{formErrors.passwordConfirmation}</p>
                )}
              </div>
              <div className="field">
                <ImageUpload 
                  onUpload={handleImageUpload} 
                />
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">
                Register Me!
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  )
}