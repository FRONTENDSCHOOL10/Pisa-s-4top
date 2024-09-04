import { Meta, StoryObj } from '@storybook/react';
import Logo from '@/components/Logo';

const meta: Meta<typeof Logo> = {
   title: 'Components/Logo',
   component: Logo,
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
   args: {},
};

export const Small: Story = {
   args: { small: true },
};

export const Large: Story = {
   args: { large: true },
};
