import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter를 임포트합니다.
import HomeReviewCard from '@/components/Review/HomeReviewCard';

const meta: Meta<typeof HomeReviewCard> = {
   title: 'Components/HomeReviewCard',
   component: HomeReviewCard,
   decorators: [
      (Story) => (
         <MemoryRouter>
            <Story />
         </MemoryRouter>
      ),
   ],
   argTypes: {
      reviewDetailPage: { control: 'text' },
      imageUrl: { control: 'text' },
      altText: { control: 'text' },
      title: { control: 'text' },
      nickname: { control: 'text' },
      comment: { control: 'text' },
   },
};

export default meta;
type Story = StoryObj<typeof HomeReviewCard>;

export const Primary: Story = {
   args: {
      reviewDetailPage: '/reviews/1',
      imageUrl: 'https://via.placeholder.com/150',
      altText: 'Review Image',
      title: '라벤더 티 후기',
      nickname: 'tea_lover',
      comment: '이 차는 정말 상쾌하고 향이 좋아요!',
   },
};
