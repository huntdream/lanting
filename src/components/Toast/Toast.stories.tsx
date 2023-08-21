// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import Toast from '.';
import { useState } from 'react';
import { Position } from './Toaster';
import Button from 'components/Button';
import React from 'react';
import useToast from './useToast';

const meta: Meta<typeof Toast> = {
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => {
    const [toast] = useToast();
    const [position, setPosition] = useState<Position>('top');
    const positions: Position[] = [
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
    ];

    return (
      <div>
        <div>
          {positions.map((p) => (
            <Button
              onClick={() => setPosition(p)}
              style={{ textTransform: 'capitalize', margin: '12px' }}
              key={p}
            >
              {p.split('-').join(' ')}
            </Button>
          ))}
        </div>
        <div style={{ marginTop: '16px' }}>
          <Button
            onClick={() =>
              toast(`This is a ${position.split('-').join(' ')} toast`, {
                position,
              })
            }
          >
            Show Toast
          </Button>
        </div>
      </div>
    );
  },
};
