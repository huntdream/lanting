import type { Preview } from '@storybook/react';
import '../src/index.scss';
import React from 'react';
import Toast from '../src/components/Toast';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <Toast>
        <Story />
      </Toast>
    ),
  ],
};

export default preview;
