import type { Meta, StoryObj } from '@storybook/react';
import {
   ButtonDefault,
   ButtonFullWidth,
   ButtonLarge,
   ButtonError,
   ButtonHeart,
   ButtonHeartwithCount,
} from '../components/Buttons/Buttons';

interface ButtonHeartwithCountProps {
  totalLike: number;
}

const meta: Meta<typeof ButtonHeartwithCount> = {
   title: 'Components/Buttons',
   component: ButtonHeartwithCount,
   argTypes: {
      totalLike: { control: 'number', defaultValue: 0 },
   },
};

export default meta;
type Story = StoryObj<typeof ButtonHeartwithCount>;

export const Default: Story = {
   render: () => <ButtonDefault />,
};

export const FullWidth: Story = {
   render: () => <ButtonFullWidth />,
};

export const Large: Story = {
   render: () => <ButtonLarge />,
};

export const Error: Story = {
   render: () => <ButtonError />,
};

export const Heart: Story = {
   render: () => <ButtonHeart />,
};

export const HeartSmallWithCount: Story = {
   render: (args: ButtonHeartwithCountProps) => <ButtonHeartwithCount {...args} />,
   args: {
      totalLike: 10,
   },
};