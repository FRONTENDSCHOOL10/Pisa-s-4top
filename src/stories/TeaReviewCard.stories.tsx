import { Meta, StoryObj } from '@storybook/react';
import {
   TeaReviewCard,
   TeaReviewCardProps,
} from '@/components/TeaCard/CardComponents';

const meta: Meta<TeaReviewCardProps> = {
   title: 'Components/Card/TeaReviewCard',
   component: TeaReviewCard,
   argTypes: {
      profileImageUrl: { control: 'text' },
      reviewTitle: { control: 'text' },
      nickName: { control: 'text' },
      reviewContent: { control: 'text' },
   },
};

export default meta;

type Story = StoryObj<TeaReviewCardProps>;

export const Default: Story = {
   args: {
      profileImageUrl: 'https://via.placeholder.com/150',
      reviewTitle: '환상적인 티',
      nickName: 'TeaLover',
      reviewContent: '이 티는 정말 맛있습니다. 부드럽고 향이 좋습니다.',
   },
};
