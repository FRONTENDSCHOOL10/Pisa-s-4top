import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BottomNav from '@/components/Main/BottomNav';

export default {
   title: 'Components/Navigation/BottomNav',
   component: BottomNav,
   decorators: [
      (Story) => (
         <Router>
            <Story />
         </Router>
      ),
   ],
} as Meta<typeof BottomNav>;

type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
   args: {},
};
