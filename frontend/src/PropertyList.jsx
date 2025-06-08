import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// PropertyList.jsx

const PropertyList = ({ onShowProperty }) => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error('Failed to fetch properties:', err))
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>BookMe Home</h1>
        <Link to="/properties/new" className="btn btn-primary">
          Add property
        </Link>
      </div>
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
              style={{ textAlign: 'left', display: 'inline-block' }}
            >
              See viewing times
            </Link>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-end mt-4">
        <Link to="/properties/new" className="btn btn-primary">
          Add property
        </Link>
      </div>
    </div>
  )
}

export default PropertyList
