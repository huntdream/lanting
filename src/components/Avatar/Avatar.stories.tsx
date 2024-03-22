import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '.';
import React from 'react';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const src = 'https://storage.maoyu.space/109895_chggwv.webp';

export const Primary: Story = {
  args: {
    src: 'https://storage.maoyu.space',
  },
  render: () => {
    return (
      <div>
        <div>
          <Avatar size='small' src={src} />
          <Avatar size='small' />
        </div>
        <div>
          <Avatar size='normal' src={src} />
          <Avatar size='normal' />
        </div>
        <div>
          <Avatar size='large' src={src} />
          <Avatar size='large' />
        </div>
      </div>
    );
  },
};
