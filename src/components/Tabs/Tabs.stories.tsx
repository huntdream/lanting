import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {
    tabs: [
      { label: 'Tab One', id: '1', content: 'Tab one content' },
      { label: 'Tab Two', id: '2', content: 'Tab two content' },
    ],
  },
};
