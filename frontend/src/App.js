import { useEffect, useState } from 'react'
import './App.css'
import BookingCalendar from 'rjs-booking-calendar'
import 'rjs-booking-calendar/dist/index.css'
import formatTimeSlots from './helpers'
import createPlugin from 'tailwindcss/plugin'

function App() {

  const [selected, setSelected] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      alert('Please select a time slot');
      return;
    }
    // Example: send selected data to your API or handle it
    console.log('Submitting:', selected);

    // TODO: call your API to update status here, e.g.:
    // updateTimeslot(selected.date, selected.time)
  };

  const handleSlotSelect = (timeslotId, updatedData) => {
  fetch(`http://localhost:3000/api/timeslots/${timeslotId}`, {
    method: 'PATCH', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ timeslot: updatedData }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors.join(', '));
      }
      return response.json();
    })
    .then((updatedTimeslot) => {
      console.log('Updated timeslot:', updatedTimeslot);
      // update your React state here if needed
    })
    .catch((error) => {
      console.error('Update failed:', error);
    });
  }

  const [availableTimes, setAvailableTimes] = useState({})

  useEffect(() => {
    fetch('http://localhost:3000/api/timeslots')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(formatTimeSlots(data)) // or set state: setTimeslots(data)
        setAvailableTimes(formatTimeSlots(data)) // or set state: setTimeslots(data)
      })
      .catch((error) => console.error('Error fetching:', error))
  }, [])

  const slotList = {
    '2025-6-4': [
      { time: '9:00 AM - 12:00 PM', status: 'booked' },
      { time: '5:00 PM - 9:00 PM', status: 'available' },
    ],
    '2025-6-5': [
      { time: '9:00 AM - 12:00 PM', status: 'reserved' },
      { time: '5:00 PM - 9:00 PM', status: 'available' },
    ],
  }

  console.log(availableTimes)


  const customTimeSlots = [
    '9:00 AM - 9:15 AM',
    '9:15 AM - 9:30 AM',
    '9:30 AM - 9:45 AM',
    '9:45 AM - 10:00 AM',
    '10:00 AM - 10:15 AM',
    '10:15 AM - 10:30 AM',
    '10:30 AM - 10:45 AM',
    '10:45 AM - 11:00 AM',
    '11:00 AM - 11:15 AM',
    '11:15 AM - 11:30 AM',
    '11:30 AM - 11:45 AM',
    '11:45 AM - 12:00 PM',
    '12:00 PM - 12:15 PM',
    '12:15 PM - 12:30 PM',
    '12:30 PM - 12:45 PM',
    '12:45 PM - 1:00 PM',
    '1:00 PM - 1:15 PM',
    '1:15 PM - 1:30 PM',
    '1:30 PM - 1:45 PM',
    '1:45 PM - 2:00 PM',
    '2:00 PM - 2:15 PM',
    '2:15 PM - 2:30 PM',
    '2:30 PM - 2:45 PM',
    '2:45 PM - 3:00 PM',
    '3:00 PM - 3:15 PM',
    '3:15 PM - 3:30 PM',
    '3:30 PM - 3:45 PM',
    '3:45 PM - 4:00 PM',
    '4:00 PM - 4:15 PM',
    '4:15 PM - 4:30 PM',
    '4:30 PM - 4:45 PM',
    '4:45 PM - 5:00 PM',
  ]

  return (
    <BookingCalendar
      mode="week"
      slotData={availableTimes}
      onSlotSelect={handleSlotSelect}
      // onMonthChange={handleMonthChange}
      disablePastDates={false}
      timeSlots={[]}
      // onClearAll={clearSlots}
      maxSelections={1}
    />
  )
}

export default App
