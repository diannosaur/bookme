import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropertySchedule from './PropertySchedule';
import PropertyViewings from './ViewingBooker';
import TimslotForm from './NewTimeslot';
import PropertyList from './PropertyList';
import NewProperty from './NewProperty';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/properties/:id/guest" element={<PropertyViewings />} />
        <Route path="/properties/:id/timeslot" element={<TimslotForm />} />
        <Route path="/properties/:id" element={<PropertySchedule />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/new" element={<NewProperty />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
