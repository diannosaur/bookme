import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProperty = ({ errors = [], onSubmit }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', address: '' })
  const [formErrors, setFormErrors] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => Promise.reject(data))
        return res.json()
      })
      .then((data) => {
        setFormErrors([])
        navigate(`/properties/${data.id}`)
      })
      .catch((err) => {
        setFormErrors(err.errors || ['Failed to create property.'])
      })
  }

  return (
    <>
      <h1 className="mb-4">
        Create a new property listing to set viewing times
      </h1>
      <form onSubmit={handleSubmit}>
        {formErrors.length > 0 && (
          <div id="error_explanation">
            <ul>
              {formErrors.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-field">
          <label className="label" htmlFor="name">
            Property identifier:
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="address">
            Address:
          </label>
          <br />
          <input
            type="text"
            name="address"
            id="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <button className="btn btn-success" type="submit">
            Create Property
          </button>
        </div>
      </form>
    </>
  )
}

export default NewProperty
