import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from '../components/Tooltip';
import Button from 'components/Button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const text = '夫寵而不驕，驕而能降，降而不憾，憾而能眕者，鮮矣';

export const Primary: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0',
        justifyContent: 'space-between',
      }}
    >
      <Tooltip title={text} placement='top'>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title={text} placement='right'>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip title={text} placement='bottom'>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title={text} placement='left'>
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};
