import type { ChangeEventHandler } from 'react'
import type { Trip } from '../types'
import { TripCard } from './TripCard'
import '../App.css'

type DestinationListProps = {
  trips: Trip[]
  search: string
  onSearchChange: ChangeEventHandler<HTMLInputElement>
  onToggleStatus: (id: number) => void
  onRemove: (id: number) => void
}

export function DestinationList({
  trips,
  search,
  onSearchChange,
  onToggleStatus,
  onRemove,
}: DestinationListProps) {
  return (
    <section className="panel" aria-labelledby="trip-list-heading">
      <div className="section-header">
        <div>
          <h2 id="trip-list-heading">Destinations</h2>
          <p>{trips.length} trips visible</p>
        </div>
        <label className="search-field">
          Search trips
          <input
            value={search}
            onChange={onSearchChange}
            placeholder="Try booked or Japan"
          />
        </label>
      </div>

      <ul className="trip-list" aria-label="Destination list">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onToggleStatus={onToggleStatus}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </section>
  )
}
