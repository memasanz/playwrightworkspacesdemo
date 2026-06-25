import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Trip } from './types'
import { ThemeToggle } from './components/ThemeToggle'
import { AddTripForm } from './components/AddTripForm'
import { DestinationList } from './components/DestinationList'
import './App.css'

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

  function handleToggleStatus(id: number) {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === id
          ? {
              ...trip,
              status: trip.status === 'Wishlist' ? 'Booked' : 'Wishlist',
            }
          : trip,
      ),
    )
  }

  function handleRemoveTrip(id: number) {
    setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== id))
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
          <ThemeToggle
            isDarkMode={isDarkMode}
            onToggle={() => setIsDarkMode((value) => !value)}
          />
        </div>
      </section>

      <AddTripForm
        value={nextTrip}
        onChange={(event) => setNextTrip(event.target.value)}
        onSubmit={handleAddTrip}
        message={message}
      />

      <DestinationList
        trips={filteredTrips}
        search={search}
        onSearchChange={(event) => setSearch(event.target.value)}
        onToggleStatus={handleToggleStatus}
        onRemove={handleRemoveTrip}
      />
    </main>
  )
}

export default App
