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
      <h1>Properties</h1>
      <ul>
        {properties?.map((property) => (
          <li key={property.id}>
            <Link
              to={`/properties/${property.id}`}
              className="btn btn-link"
              style={{ textAlign: 'left', display: 'inline-block' }}
            >
              <strong>{property.name}</strong>
              <br />
              {property.address}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/properties/new" className="btn btn-primary">
        Add property
      </Link>
    </div>
  )
}

export default PropertyList
