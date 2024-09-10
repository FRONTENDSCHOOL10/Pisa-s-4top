import { Meta, StoryObj } from '@storybook/react';
import { TabButton, TabButtonProps } from '@/components/Buttons/TabButton'; 

const meta: Meta<TabButtonProps> = {
   title: 'Components/TabButton',
   component: TabButton,
   argTypes: {
      type: { control: 'select', options: ['button', 'submit', 'reset'] },
      tabs: { control: 'object' },
      onTabSelect: { action: 'tabSelected' },
   },
};

export default meta;

export const Default: StoryObj<TabButtonProps> = {
   args: {
      type: 'button',
      tabs: ['홍차', '우롱차', '녹차', '허브차'],
   },
};
