import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { TripCard } from './TripCard'

const meta = {
  title: 'Travel planner/TripCard',
  component: TripCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { onToggleStatus: fn(), onRemove: fn() },
  decorators: [
    (Story) => (
      <main className="app" style={{ minHeight: 'auto', padding: 24 }}>
        <ul className="trip-list">
          <Story />
        </ul>
      </main>
    ),
  ],
} satisfies Meta<typeof TripCard>

export default meta
type Story = StoryObj<typeof meta>

export const Wishlist: Story = {
  args: {
    trip: { id: 1, city: 'Lisbon', country: 'Portugal', status: 'Wishlist' },
  },
}

export const Booked: Story = {
  args: {
    trip: { id: 2, city: 'Tokyo', country: 'Japan', status: 'Booked' },
  },
}

export const NewlyAdded: Story = {
  args: {
    trip: { id: 3, city: 'Barcelona', country: 'Next adventure', status: 'Wishlist' },
  },
}

export const DarkMode: Story = {
  args: {
    trip: { id: 2, city: 'Tokyo', country: 'Japan', status: 'Booked' },
  },
  decorators: [
    (Story) => (
      <main className="app app--dark" style={{ minHeight: 'auto', padding: 24 }}>
        <ul className="trip-list">
          <Story />
        </ul>
      </main>
    ),
  ],
}
