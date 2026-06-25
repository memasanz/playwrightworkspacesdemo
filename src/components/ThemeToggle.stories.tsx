import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { ThemeToggle } from './ThemeToggle'

const meta = {
  title: 'Travel planner/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onToggle: fn() },
  decorators: [
    (Story) => (
      <main className="app" style={{ minHeight: 'auto', padding: 24 }}>
        <Story />
      </main>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const LightMode: Story = {
  args: { isDarkMode: false },
}

export const DarkMode: Story = {
  args: { isDarkMode: true },
  decorators: [
    (Story) => (
      <main className="app app--dark" style={{ minHeight: 'auto', padding: 24 }}>
        <Story />
      </main>
    ),
  ],
}
