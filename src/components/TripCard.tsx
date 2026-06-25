import type { Trip } from '../types'
import '../App.css'

type TripCardProps = {
  trip: Trip
  onToggleStatus: (id: number) => void
  onRemove: (id: number) => void
}

export function TripCard({ trip, onToggleStatus, onRemove }: TripCardProps) {
  const toggleLabel =
    trip.status === 'Wishlist'
      ? `Mark ${trip.city} as booked`
      : `Move ${trip.city} to wishlist`

  return (
    <li>
      <div className="trip-card__main">
        <div>
          <strong>{trip.city}</strong>
          <span>{trip.country}</span>
        </div>
        <span className="badge">{trip.status}</span>
      </div>
      <div className="trip-actions">
        <button type="button" onClick={() => onToggleStatus(trip.id)}>
          {toggleLabel}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => onRemove(trip.id)}
        >
          Remove {trip.city}
        </button>
      </div>
    </li>
  )
}
