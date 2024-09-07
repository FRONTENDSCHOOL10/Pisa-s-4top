import { Meta, StoryObj } from '@storybook/react';
import { SelectColor } from '@/components/Select/SelectColor';

const meta: Meta<typeof SelectColor> = {
   title: 'Components/Input/ColorDropdown',
   component: SelectColor,
};

export default meta;

type Story = StoryObj<typeof SelectColor>;

export const Default: Story = {
   args: {},
};
