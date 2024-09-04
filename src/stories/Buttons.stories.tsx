import type { Meta, StoryObj } from '@storybook/react';
import {
   ButtonSmall,
   ButtonMedium,
   ButtonLarge,
   ButtonLargeError,
   ButtonXlarge,
   ButtonHeart,
   ButtonHeartSmall,
   ButtonHeartSmallwithCount,
} from '../components/Buttons/Buttons';

const meta: Meta = {
   title: 'Components/Buttons',
   component: ButtonSmall,
};

export default meta;
type Story = StoryObj;

export const Small: Story = {
   render: () => <ButtonSmall />,
};

export const Medium: Story = {
   render: () => <ButtonMedium />,
};

export const Large: Story = {
   render: () => <ButtonLarge />,
};

export const LargeError: Story = {
   render: () => <ButtonLargeError />,
};

export const XLarge: Story = {
   render: () => <ButtonXlarge />,
};

export const Heart: Story = {
   render: () => <ButtonHeart />,
};

export const HeartSmall: Story = {
   render: () => <ButtonHeartSmall />,
};

export const HeartSmallWithCount: Story = {
   render: () => <ButtonHeartSmallwithCount />,
};
