import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';

export default {
   title: 'Components/BottomNav',
   component: BottomNav,
   decorators: [
      (Story) => (
         <Router>
            <Story />
         </Router>
      ),
   ],
} as Meta;

const Template: StoryFn = (args: any) => <BottomNav {...args} />;

export const Default = Template.bind({});
Default.args = {};
