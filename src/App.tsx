import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Trip = {
  id: number
  city: string
  country: string
  status: 'Wishlist' | 'Booked'
}

const initialTrips: Trip[] = [
  { id: 1, city: 'Lisbon', country: 'Portugal', status: 'Wishlist' },
  { id: 2, city: 'Tokyo', country: 'Japan', status: 'Booked' },
  { id: 3, city: 'Vancouver', country: 'Canada', status: 'Wishlist' },
]

function App() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('')
  const [trips, setTrips] = useState(initialTrips)
  const [nextTrip, setNextTrip] = useState('')
  const [message, setMessage] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const normalizedSearch = search.trim().toLowerCase()

      return (
        trip.city.toLowerCase().includes(normalizedSearch) ||
        trip.country.toLowerCase().includes(normalizedSearch) ||
        trip.status.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [search, trips])

  function handleAddTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTrip = nextTrip.trim()

    if (!trimmedTrip) {
      setMessage('Add a city before saving your trip.')
      return
    }

    const newTrip: Trip = {
      id: Date.now(),
      city: trimmedTrip,
      country: 'Next adventure',
      status: 'Wishlist',
    }

    setTrips((currentTrips) => [newTrip, ...currentTrips])
    setNextTrip('')
    setMessage(`${trimmedTrip} was added to your wishlist.`)
  }

  return (
    <main className={isDarkMode ? 'app app--dark' : 'app'}>
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">React + TypeScript + Playwright</p>
        <h1 id="page-title">Travel planner test lab</h1>
        <p className="hero__intro">
          A tiny web app with buttons, forms, lists, filtering, and visual state
          changes so you can practice end-to-end testing.
        </p>
        <div className="hero__actions">
          <button type="button" onClick={() => setCount((value) => value + 1)}>
            Clicked {count} {count === 1 ? 'time' : 'times'}
          </button>
          <button
            type="button"
            className="secondary"
            aria-pressed={isDarkMode}
            onClick={() => setIsDarkMode((value) => !value)}
          >
            {isDarkMode ? 'Use light mode' : 'Use dark mode'}
          </button>
        </div>
      </section>

      <section className="panel" aria-labelledby="add-trip-heading">
        <h2 id="add-trip-heading">Add a destination</h2>
        <form className="trip-form" onSubmit={handleAddTrip}>
          <label htmlFor="next-trip">City</label>
          <div>
            <input
              id="next-trip"
              name="next-trip"
              value={nextTrip}
              onChange={(event) => setNextTrip(event.target.value)}
              placeholder="Barcelona"
            />
            <button type="submit">Add trip</button>
          </div>
        </form>
        {message ? (
          <p className="status-message" role="status">
            {message}
          </p>
        ) : null}
      </section>

      <section className="panel" aria-labelledby="trip-list-heading">
        <div className="section-header">
          <div>
            <h2 id="trip-list-heading">Destinations</h2>
            <p>{filteredTrips.length} trips visible</p>
          </div>
          <label className="search-field">
            Search trips
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try booked or Japan"
            />
          </label>
        </div>

        <ul className="trip-list" aria-label="Destination list">
          {filteredTrips.map((trip) => (
            <li key={trip.id}>
              <div>
                <strong>{trip.city}</strong>
                <span>{trip.country}</span>
              </div>
              <span className="badge">{trip.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
