export default function formatTimeslots(timeslots) {
  const grouped = {};

  timeslots.forEach(slot => {
    // Format date as 'YYYY-M-D' (remove leading zeroes)
    const dateKey = new Date(slot.viewing_date).toISOString().split('T')[0];
    const [year, month, day] = dateKey.split('-');
    const key = `${year}-${parseInt(month)}-${parseInt(day)}`;

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
