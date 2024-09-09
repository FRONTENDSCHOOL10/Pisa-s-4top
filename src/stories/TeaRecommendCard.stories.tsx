import { Meta, StoryObj } from '@storybook/react';
import {
   TeaRecommendCard,
   TeaRecommendCardProps,
} from '@/components/TeaCard/CardComponents';

const meta: Meta<TeaRecommendCardProps> = {
   title: 'Components/Card/TeaRecommendCard',
   component: TeaRecommendCard,
   argTypes: {
      teaName: { control: 'text' },
      imageUrl: { control: 'text' },
      brand: { control: 'text' },
   },
};

export default meta;

type Story = StoryObj<TeaRecommendCardProps>;

export const Default: Story = {
   args: {
      teaName: '말차 그린 티',
      imageUrl: 'https://via.placeholder.com/150',
      brand: 'TeaBrand',
   },
};
