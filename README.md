# Event Countdown Timer

A simple web application that displays a live countdown to the nearest upcoming event from a predefined list.

## Features

- Displays countdown to the next upcoming event
- Smart time formatting based on time remaining:
  - **More than 48 hours away**: Shows days only (rounded up)
  - **48 hours or less**: Shows days and hours (rounded up)
  - **24 hours or less**: Shows hours and minutes (rounded up)
- Live updates every second
- Responsive design with gradient background
- Displays event name and full date/time

## Usage

1. Open `index.html` in a web browser
2. The countdown will automatically show the nearest upcoming event

## Customizing Events

To modify the list of events, edit the `events` array in `script.js`:

```javascript
const events = [
    { name: "Event Name", datetime: new Date("2026-01-27T14:00:00") },
    // Add more events here
];
```

Use the format: `new Date("YYYY-MM-DDTHH:mm:ss")` for the datetime.

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and layout
- `script.js` - Countdown logic and event management

## How It Works

1. The app filters all events to find those in the future
2. Selects the event with the nearest datetime
3. Calculates the time difference and formats it according to the rules
4. Updates the display every second
