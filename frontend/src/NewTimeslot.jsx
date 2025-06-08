import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function TimeslotForm({ errors = [] }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [propertyName, setPropertyName] = useState(null)
  const [propertyAddress, setPropertyAddress] = useState(null)
  const [formErrors, setFormErrors] = useState([]);

  const fetchPropertyInfo = useCallback(() => {
    fetch(`http://localhost:3000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPropertyName(data.name)
        setPropertyAddress(data.address)
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [id])

  // Fetch property info when component mounts or id changes
  useEffect(() => {
    fetchPropertyInfo()
  }, [fetchPropertyInfo])

  const [form, setForm] = useState({
    viewing_date: '',
    start_time: '',
    end_time: '',
    max_guests: '',
    property_id: id,
  })

  const createTimeSlot = (form) => {
    fetch(`http://localhost:3000/api/timeslots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json()
          console.log(error.errors)
          throw error.errors
        }
      })
      .then(() => {
        setFormErrors([]);
        navigate(`/properties/${id}`)
      })
      .catch((err) => {
        console.log(err)
        setFormErrors(err || ["Failed to create timeslot."]);
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    console.log('Form updated:', { ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTimeSlot(form)
  }

  return (
    <div>
      <h1>Create new time slot for {propertyName}</h1>
      <p>{propertyAddress}</p>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="property_id" value={id} />

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
          <label className="label" htmlFor="viewing_date">
            Viewing date
          </label>
          <br />
          <input
            type="date"
            name="viewing_date"
            value={form.viewing_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="start_time">
            Start time
          </label>
          <br />
          <input
            type="time"
            name="start_time"
            value={form.start_time}
            step="900"
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="end_time">
            End time
          </label>
          <br />
          <input
            type="time"
            name="end_time"
            value={form.end_time}
            step="900"
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="max_guests">
            Max guests
          </label>
          <br />
          <input
            type="number"
            name="max_guests"
            value={form.max_guests}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <button type="submit" className="btn btn-primary">
            Create time slot
          </button>
        </div>
      </form>
    </div>
  )
}

export default TimeslotForm
