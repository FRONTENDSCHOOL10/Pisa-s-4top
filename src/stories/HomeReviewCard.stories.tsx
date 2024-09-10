import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
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
      id: { control: 'text' },
      profileImg: { control: 'text' },
      title: { control: 'text' },
      nickname: { control: 'text' },
      comment: { control: 'text' },
      score: { control: { type: 'number', min: 0, max: 5, step: 1 } },
   },
};

export default meta;
type Story = StoryObj<typeof HomeReviewCard>;

export const Primary: Story = {
   args: {
      id: '1',
      profileImg: 'https://via.placeholder.com/150',
      title: '라벤더 티 후기',
      nickname: 'tea_lover',
      comment: '이 차는 정말 상쾌하고 향이 좋아요!',
      score: 3,
   },
};
