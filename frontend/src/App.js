import PropertyViewings from './PropertyViewings'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/property/:id" element={<PropertyViewings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
