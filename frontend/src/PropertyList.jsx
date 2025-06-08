import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

// PropertyList.jsx

const PropertyList = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error('Failed to fetch properties:', err))
  }, [])

  const deleteProperty = useCallback((id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return
    }
    fetch(`http://localhost:3000/api/properties/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setProperties(data)
      })
      .catch((error) => console.error('Error deleting:', error))
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Viewing Scheduler Home</h1>
        <Link to="/properties/new" className="btn btn-primary">
          Add property
        </Link>
      </div>
      {properties?.length > 0 ? (
        <>
          {properties?.map((property) => (
            <div key={property.id} class="card mb-3">
              <img
                src="https://tinyurl.com/a5jrvszm"
                className="card-img-top"
                alt="..."
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5>
                  <strong>{property.name}</strong>
                </h5>
                <p>{property.address}</p>
                <Link
                  to={`/properties/${property.id}`}
                  className="btn btn-secondary"
                >
                  See viewing times
                </Link>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => deleteProperty(property.id)}
                >
                  Delete property
                </button>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end mt-4">
            <Link to="/properties/new" className="btn btn-primary">
              Add property
            </Link>
          </div>
        </>
      ) : (
        <div className="alert alert-info">
          No properties found. Please add a property to create viewing times.
        </div>
      )}
    </div>
  )
}

export default PropertyList
