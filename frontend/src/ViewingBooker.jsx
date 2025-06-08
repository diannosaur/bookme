import { useEffect, useState, useCallback } from 'react'
import './App.css'
import formatTimeSlots from './helpers'
import { useParams } from 'react-router-dom'

function PropertyViewings() {
  const [selected, setSelected] = useState(null)
  const [propertyName, setPropertyName] = useState(null)
  const [propertyAddress, setPropertyAddress] = useState(null)

  const { id } = useParams()

  const [availableTimes, setAvailableTimes] = useState({})

  const fetchAvailableTimes = useCallback(() => {
    fetch(`http://localhost:3000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched properties:', data.timeslots)
        setAvailableTimes(formatTimeSlots(data.timeslots))
        setPropertyName(data.name)
        setPropertyAddress(data.address)
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [id])

  useEffect(() => {
    fetchAvailableTimes()
  }, [fetchAvailableTimes])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selected) {
      alert('Please select a time slot')
      return
    }
    console.log('Submitting:', selected)
    handleSlotSelect(selected)
  }

  const handleSlotSelect = (id) => {
    fetch(`http://localhost:3000/api/timeslots/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ timeslot: { status: 'reserved' } }),
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log(response)
          const error = await response.json()
          throw new Error(error.errors.join(', '))
        }
        return response.json()
      })
      .then((updatedTimeslot) => {
        console.log('Updated timeslot:', updatedTimeslot)
        fetchAvailableTimes()
      })
      .catch((error) => {
        console.error('Update failed:', error)
      })
  }

  return (
    <div className="">
      <h1>Book a viewing time for {propertyName}</h1>
      <p>Address: {propertyAddress}</p>
      <div className="row">
        <div className="col">
          <img
            src="https://tinyurl.com/a5jrvszm"
            alt="Property"
            className="img-thumbnail"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <form onSubmit={handleSubmit} className="col">
          {Object.entries(availableTimes).map(([date, slots]) => (
            <div key={date} style={{ marginBottom: '1rem' }}>
              <h2>{date}</h2>
              {slots.map(({ time, status, id }) => {
                // Disable slot if status is not 'available'
                const disabled = status !== 'available'
                return (
                  <label
                    key={time}
                    style={{ display: 'block', opacity: disabled ? 0.5 : 1 }}
                  >
                    <input
                      type="radio"
                      name="timeslot"
                      value={id}
                      disabled={disabled}
                      checked={selected === id}
                      onChange={() => setSelected(id)}
                      className="me-2"
                    />
                    {time} ({status})
                  </label>
                )
              })}
            </div>
          ))}
          <button className="btn btn-primary" type="submit">
            Book selected time
          </button>
        </form>
      </div>
    </div>
  )
}

export default PropertyViewings
