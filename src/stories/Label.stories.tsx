import { Label } from '@/components/Labels/Labels';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
   title: 'Components/Label',
   component: Label,
   argTypes: {
      content: { control: 'text' },
      size: { control: { type: 'radio', options: ['small', 'large'] } },
      isWarning: { control: 'boolean' },
   },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
   args: {
      content: '🍒 체리',
      size: 'small',
      isWarning: false,
   },
};

export const Large: Story = {
   args: {
      content: '🍒 체리',
      size: 'large',
      isWarning: false,
   },
};

export const Warning: Story = {
   args: {
      content: '',
      size: 'small',
      isWarning: true,
   },
};
