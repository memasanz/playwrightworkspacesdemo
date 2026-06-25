import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { AddTripForm } from './AddTripForm'

const meta = {
  title: 'Travel planner/AddTripForm',
  component: AddTripForm,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { value: '', onChange: fn(), onSubmit: fn() },
  decorators: [
    (Story) => (
      <main className="app" style={{ minHeight: 'auto', padding: 24 }}>
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof AddTripForm>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithInput: Story = {
  args: { value: 'Barcelona' },
}

export const SuccessMessage: Story = {
  args: { value: '', message: 'Barcelona was added to your wishlist.' },
}

export const ValidationError: Story = {
  args: { value: '', message: 'Add a city before saving your trip.' },
}
