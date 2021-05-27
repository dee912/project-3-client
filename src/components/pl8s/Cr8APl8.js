import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import useForm from '../../hooks/useForm'
import { cr8APl8 } from '../../lib/api'
import { useState } from 'react'
import Pl8Form from './Pl8Form'
import { motion } from 'framer-motion'


export default function Cr8APl8() {
  const history = useHistory()
  const { formdata, formErrors, handleChange, setFormErrors } = useForm({
    name: '',
    origin: '',
    description: '',
    ingredients: [],
    recipe: [''],
    prepTime: 0,
    cookTime: 0,
    image: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { data } = await cr8APl8(formdata)
      console.log(data._id)
      history.push(`/pl8s/${data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(formdata)

  return (
    <motion.div  
      initial={{ opacity: 0 }}
      animate={{ opacity: 1  }} 
      exit={{ opacity: 0 }}
    >
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter box">
              <Pl8Form
                formdata={formdata}
                formErrors={formErrors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setFormErrors={setFormErrors}
              />
            </div>
          </div>
        </div>
      </section>
      
    </motion.div>
  )
}