import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from '../components/ ColorPicker';
import React from 'react';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Primary: Story = {
  render: () => <ColorPicker />,
};
