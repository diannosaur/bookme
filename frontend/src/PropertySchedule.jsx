// PropertyTimeslots.jsx
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

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

  return displayTime.toLocaleTimeString('en-NZ', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function PropertySchedule({ property, onNewTimeslot }) {
  const { id } = useParams()
  const location = useLocation()

  const [propertyName, setPropertyName] = useState(null)
  const [propertyAddress, setPropertyAddress] = useState(null)
  const [times, setTimes] = useState(null)

  const fetchPropertyInfo = useCallback(() => {
    fetch(`http://localhost:3000/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPropertyName(data.name)
        setPropertyAddress(data.address)
        setTimes(data.timeslots)
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [id])

  const copyLink = () => {
    const url = window.location.origin + location.pathname + '/book'
    navigator.clipboard
      .writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link.'))
  }

  useEffect(() => {
    fetchPropertyInfo()
  }, [fetchPropertyInfo])

  const deleteTime = (timeslotId) => {
    if (!window.confirm('Are you sure you want to delete this viewing time?')) {
      return
    }
    fetch(`http://localhost:3000/api/timeslots/${timeslotId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setTimes((prevTimes) =>
          prevTimes.filter((time) => time.id !== timeslotId)
        )
      })
      .catch((error) => console.error('Error deleting:', error))
  }
  return (
    <div>
      <h1>Viewing times for {propertyName}</h1>
      <h2>Address: {propertyAddress}</h2>
      <div className="d-flex mt-4 mb-4 gap-2">
        <Link to={`/properties/${id}/timeslot`} className="btn btn-success">
          Create new viewing time
        </Link>
        <button className="btn btn-secondary" onClick={copyLink}>
          Copy booking link
        </button>
        <Link to={`/properties`} className="btn btn-primary">
          View all properties
        </Link>
      </div>
      {times?.length === 0 ? (
        <div className="alert alert-info">
          No viewing times scheduled for this property.
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {times?.map((timeslot) => (
              <tr key={timeslot.id}>
                <td>{formatDate(timeslot.viewing_date)}</td>
                <td>{formatTime(timeslot.start_time)}</td>
                <td>{formatTime(timeslot.end_time)}</td>
                <td
                  className={classNames(
                    timeslot.status === 'available'
                      ? 'text-bg-success'
                      : 'text-bg-danger'
                  )}
                >
                  {timeslot.status}
                </td>
                <td>
                  <button
                    value={timeslot.id}
                    className="btn btn-danger"
                    onClick={() => deleteTime(timeslot.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PropertySchedule
