import { LabelButton } from '@/components/Labels/Labels';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LabelButton> = {
   title: 'Components/Label/LabelButton',
   component: LabelButton,
   argTypes: {
      label: { control: 'text' },
      size: { control: { type: 'radio', options: ['small', 'large'] } },
   },
};

export default meta;
type Story = StoryObj<typeof LabelButton>;

export const Default: Story = {
   args: {
      label: '🍒 체리',
      size: 'small',
   },
};

export const Large: Story = {
   args: {
      label: '🍒 체리',
      size: 'large',
   },
};