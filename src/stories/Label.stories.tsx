import { Label } from '@/components/Labels/Labels';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
   title: 'Components/Label',
   component: Label,
   argTypes: {
      label: { control: 'text' },
      size: { control: { type: 'radio', options: ['small', 'large'] } },
      isWarning: { control: 'boolean' },
   },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
   args: {
      label: '🍒 체리',
      size: 'small',
      isWarning: false,
   },
};

export const Large: Story = {
   args: {
      label: '🍒 체리',
      size: 'large',
      isWarning: false,
   },
};

export const Warning: Story = {
   args: {
      label: '',
      size: 'small',
      isWarning: true,
   },
};
