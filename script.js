// Hard-coded list of events
const events = [
    { name: "Haircut Appointment", datetime: new Date("2026-01-27T14:00:00") },
    { name: "Birthday Party", datetime: new Date("2026-02-15T18:30:00") },
    { name: "Dentist Checkup", datetime: new Date("2026-01-25T10:00:00") },
    { name: "Team Meeting", datetime: new Date("2026-01-30T09:00:00") },
    { name: "Vacation Trip", datetime: new Date("2026-03-10T06:00:00") }
];

// Find the nearest future event
function getNearestEvent() {
    const now = new Date();
    const futureEvents = events.filter(event => event.datetime > now);

    if (futureEvents.length === 0) {
        return null;
    }

    return futureEvents.reduce((nearest, current) => {
        return current.datetime < nearest.datetime ? current : nearest;
    });
}

// Calculate and format the countdown
function formatCountdown(eventDate) {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        return "Event has started!";
    }

    const totalMilliseconds = diff;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const TWO_DAYS_IN_HOURS = 48;
    const ONE_DAY_IN_HOURS = 24;

    // More than 2 days away: show days only (rounded up)
    if (totalHours > TWO_DAYS_IN_HOURS) {
        const remainingHours = totalHours % 24;
        const daysRoundedUp = remainingHours > 0 ? totalDays + 1 : totalDays;
        return `${daysRoundedUp} ${daysRoundedUp === 1 ? 'day' : 'days'}`;
    }

    // <= 48 hours but > 24 hours: show days and hours (rounded up)
    if (totalHours > ONE_DAY_IN_HOURS) {
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        const remainingMinutes = totalMinutes % 60;
        const hoursRoundedUp = remainingMinutes > 0 ? hours + 1 : hours;

        return `${days} ${days === 1 ? 'day' : 'days'} ${hoursRoundedUp} ${hoursRoundedUp === 1 ? 'hour' : 'hours'}`;
    }

    // <= 24 hours: show hours and minutes (rounded up)
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;
    const minutesRoundedUp = remainingSeconds > 0 ? minutes + 1 : minutes;

    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutesRoundedUp} ${minutesRoundedUp === 1 ? 'minute' : 'minutes'}`;
}

// Format date for display
function formatEventDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Update the display
function updateCountdown() {
    const nearestEvent = getNearestEvent();

    if (!nearestEvent) {
        document.getElementById('event-name').textContent = 'No upcoming events';
        document.getElementById('countdown').querySelector('.countdown-display').textContent = '--';
        document.getElementById('event-date').textContent = '';
        return;
    }

    document.getElementById('event-name').textContent = nearestEvent.name;
    document.getElementById('countdown').querySelector('.countdown-display').textContent =
        formatCountdown(nearestEvent.datetime);
    document.getElementById('event-date').textContent = formatEventDate(nearestEvent.datetime);
}

// Initialize and update every second
updateCountdown();
setInterval(updateCountdown, 1000);
