import type { ChangeEventHandler, FormEventHandler } from 'react'
import '../App.css'

type AddTripFormProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: FormEventHandler<HTMLFormElement>
  message?: string
}

export function AddTripForm({
  value,
  onChange,
  onSubmit,
  message,
}: AddTripFormProps) {
  return (
    <section className="panel" aria-labelledby="add-trip-heading">
      <h2 id="add-trip-heading">Add a destination</h2>
      <form className="trip-form" onSubmit={onSubmit}>
        <label htmlFor="next-trip">City</label>
        <div>
          <input
            id="next-trip"
            name="next-trip"
            value={value}
            onChange={onChange}
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
  )
}
