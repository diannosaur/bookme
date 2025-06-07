import { useEffect, useState } from 'react'
import './App.css'
import formatTimeSlots from './helpers'

function App() {
  const [selected, setSelected] = useState(null)

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

  const [availableTimes, setAvailableTimes] = useState({})

  useEffect(() => {
    fetchAvailableTimes()
  }, [])

  const fetchAvailableTimes = () => {
    fetch('http://localhost:3000/api/timeslots')
      .then((response) => response.json())
      .then((data) => {
        setAvailableTimes(formatTimeSlots(data))
      })
      .catch((error) => console.error('Error fetching:', error))
  }

  return (
    <div class="container mt-5">
      <form onSubmit={handleSubmit}>
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
                  />
                  {time} ({status})
                </label>
              )
            })}
          </div>
        ))}
        <button class="btn btn-primary" type="submit">Book selected time</button>
      </form>
    </div>
  )
}

export default App
