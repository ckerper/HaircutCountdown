// Hard-coded list of events
const events = [
    { name: "Buzz", datetime: new Date("2026-02-03T19:30:00") },
    { name: "Buzz", datetime: new Date("2026-02-24T15:00:00") },
    { name: "Haircut", datetime: new Date("2026-03-31T15:00:00") },
    { name: "Buzz", datetime: new Date("2026-05-02T15:45:00") },
    { name: "Buzz", datetime: new Date("2026-05-26T13:00:00") },
    { name: "Haircut", datetime: new Date("2026-06-16T13:00:00") }
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

// Format full time breakdown for tooltip
function formatFullBreakdown(eventDate) {
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

    const days = totalDays;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    const parts = [];
    if (days > 0) {
        parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
    }
    if (hours > 0 || days > 0) {
        parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    }
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);

    return parts.join(' ');
}

// Format date for display
function formatEventDate(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1; // getMonth() is 0-indexed
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
    const minutesFormatted = minutes.toString().padStart(2, '0');

    return `${dayOfWeek} ${month}/${day} ${hours12}:${minutesFormatted} ${period}`;
}

// Format date for upcoming list (just day and date)
function formatUpcomingDate(date) {
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dayOfWeek} ${month}/${day}`;
}

// Populate upcoming events list
function populateUpcomingList() {
    const now = new Date();
    const futureEvents = events
        .filter(event => event.datetime > now)
        .sort((a, b) => a.datetime - b.datetime)
        .slice(1); // Skip the first event (shown in countdown box)

    const upcomingListElement = document.getElementById('upcoming-list');
    upcomingListElement.innerHTML = '';

    futureEvents.forEach(event => {
        const div = document.createElement('div');
        div.className = 'upcoming-list-item';
        if (event.name.toLowerCase() === 'haircut') {
            div.classList.add('haircut');
        }
        div.textContent = formatUpcomingDate(event.datetime);
        upcomingListElement.appendChild(div);
    });
}

// Update the display
function updateCountdown() {
    const nearestEvent = getNearestEvent();
    const countdownElement = document.getElementById('countdown').querySelector('.countdown-display');

    if (!nearestEvent) {
        document.getElementById('event-name').textContent = 'no upcoming events';
        countdownElement.textContent = '--';
        countdownElement.title = '';
        document.getElementById('event-date').textContent = '';
        return;
    }

    document.getElementById('event-name').textContent = nearestEvent.name;
    countdownElement.textContent = formatCountdown(nearestEvent.datetime);
    countdownElement.title = formatFullBreakdown(nearestEvent.datetime);
    document.getElementById('event-date').textContent = formatEventDate(nearestEvent.datetime);
}

// Initialize and update every second
populateUpcomingList();
updateCountdown();
setInterval(updateCountdown, 1000);
