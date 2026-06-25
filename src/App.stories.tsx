import type { Meta, StoryObj } from '@storybook/react-vite';

import App from './App';

// The full travel-planner app, so designers can review the end-to-end
// workflow and UX (add a trip, search/filter, dark mode) in isolation.
const meta = {
  title: 'Travel planner/Full app',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
