// PropertyTimeslots.jsx
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import formatTimeSlots from './helpers'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-NZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatTime = (time) => {
  const displayTime = new Date(time)
  console.log('unFormatted time:', time)
  console.log('Formatted time:', displayTime)

  return displayTime.toLocaleTimeString('en-NZ', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function PropertySchedule({ property, onNewTimeslot }) {
  const { id } = useParams()

  const [propertyName, setPropertyName] = useState(null)
  const [propertyAddress, setPropertyAddress] = useState(null)
  const [times, setTimes] = useState(null)

  const fetchPropertyInfo = useCallback(() => {
    fetch(`http://localhost:3000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPropertyName(data.name)
        setPropertyAddress(data.address)
        setTimes(data.timeslots)
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [id])

  // Fetch property info when component mounts or id changes
  useEffect(() => {
    fetchPropertyInfo()
  }, [fetchPropertyInfo])
  return (
    <div>
      <h1>Scheduled viewing times for {propertyName} property</h1>
      <h2>{propertyAddress}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {times?.map((timeslot) => (
            <tr key={timeslot.id}>
              <td>{formatDate(timeslot.viewing_date)}</td>
              <td>{formatTime(timeslot.start_time)}</td>
              <td>{formatTime(timeslot.end_time)}</td>
              <td>{timeslot.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/properties/${id}/timeslot`} className="btn btn-primary">
        Create New Timeslot
      </Link>
      <Link to={`/properties`} className="btn btn-primary">
        View all properties
      </Link>
    </div>
  )
}

export default PropertySchedule
