import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { DestinationList } from './DestinationList'
import type { Trip } from '../types'

const sampleTrips: Trip[] = [
  { id: 1, city: 'Lisbon', country: 'Portugal', status: 'Wishlist' },
  { id: 2, city: 'Tokyo', country: 'Japan', status: 'Booked' },
  { id: 3, city: 'Vancouver', country: 'Canada', status: 'Wishlist' },
]

const meta = {
  title: 'Travel planner/DestinationList',
  component: DestinationList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { search: '', onSearchChange: fn(), onToggleStatus: fn(), onRemove: fn() },
  decorators: [
    (Story) => (
      <main className="app" style={{ minHeight: 'auto', padding: 24 }}>
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof DestinationList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { trips: sampleTrips },
}

export const Filtered: Story = {
  args: {
    search: 'Japan',
    trips: sampleTrips.filter((trip) => trip.country === 'Japan'),
  },
}

export const Empty: Story = {
  args: { search: 'Antarctica', trips: [] },
}

export const DarkMode: Story = {
  args: { trips: sampleTrips },
  decorators: [
    (Story) => (
      <main className="app app--dark" style={{ minHeight: 'auto', padding: 24 }}>
        <Story />
      </main>
    ),
  ],
}
