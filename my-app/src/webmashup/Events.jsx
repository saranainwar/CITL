import React, { useState } from 'react';
import axios from 'axios';

const EventApp = () => {
  const [query, setQuery] = useState('');       // Search query (e.g., event name, keyword)
  const [location, setLocation] = useState(''); // Selected location
  const [events, setEvents] = useState([]);     // List of events fetched

  const locations = [
    { label: 'New York, USA', value: 'New York' },
    { label: 'Los Angeles, USA', value: 'Los Angeles' },
    { label: 'London, UK', value: 'London' },
    { label: 'Sydney, Australia', value: 'Sydney' },
    // Add more locations as needed
  ];

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
        headers: {
          Authorization: `Bearer S2NS2BPQRJAO2UXT4WNR`
        },
        params: {
          q: query,
          'location.address': location,
          'location.within': '10km', // Radius for search around location
          sort_by: 'date'           // Sort events by date
        }
      });
      setEvents(response.data.events); // Save fetched events to state
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Eventbrite Event Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for events (e.g., music, tech)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.value} value={loc.value}>{loc.label}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: '10px' }}>Search</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <h2>{event.name.text}</h2>
                <p>{event.description.text}</p>
                <p><strong>Date:</strong> {new Date(event.start.local).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.venue?.address?.localized_address_display}</p>
                <a href={event.url} target="_blank" rel="noopener noreferrer">More Info</a>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found. Try a different search or location.</p>
        )}
      </div>
    </div>
  );
};

export default EventApp;
