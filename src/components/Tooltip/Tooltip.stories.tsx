import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from '.';
import Button from 'components/Button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const text = '夫寵而不驕，驕而能降，降而不憾，憾而能眕者，鮮矣';

export const Primary: Story = {
  args: {
    children: <Button>Tootip</Button>,
    title: text,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px', overflow: 'auto' }}>
        <div
          style={{
            margin: '3em',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            height: '400px',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};
