import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBar, { AppBarProps } from '@/components/Main/AppBar';

export default {
   title: 'Components/Navigation/AppBar',
   component: AppBar,
   decorators: [
      (Story) => (
         <Router>
            <Story />
         </Router>
      ),
   ],
} as Meta;

const Template: StoryFn<AppBarProps> = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
   hasBackBtn: true,
   hasLogo: false,
   title: 'Default Title',
};

export const WithLogo = Template.bind({});
WithLogo.args = {
   hasBackBtn: false,
   hasLogo: true,
   title: '',
};

export const WithTitle = Template.bind({});
WithTitle.args = {
   hasBackBtn: false,
   hasLogo: false,
   title: 'Custom Title',
};
