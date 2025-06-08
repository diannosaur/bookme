import { DateTime } from 'luxon'

export const toUTCISOString = (date, time) => {
  if (!date || !time) return false
  const dt = DateTime.fromISO(`${date}T${time}`, { zone: 'local' })
  return dt.toUTC().toISO()
}

export default function formatTimeslots(timeslots) {
  const grouped = {};

  timeslots.forEach(slot => {
    const key = new Date(slot.viewing_date).toLocaleDateString('en-NZ', { weekday: 'long',   year: 'numeric', month: 'long', day: 'numeric'})

    // Format time range like '9:00 AM - 12:00 PM'
    const start = new Date(slot.start_time);
    const end = new Date(slot.end_time);
    console.log(slot.end_time)

    const formatTime = date =>
      date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
      });

    const timeRange = `${formatTime(start)} - ${formatTime(end)}`;

    const entry = { id: slot.id, time: timeRange, status: slot.status, startTime: formatTime(start) };

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(entry);
  });

  return grouped;
}
