import type { Meta, StoryObj } from '@storybook/react';
import TeaRecommendCard from '@/components/TeaCard/TeaRecommendCard';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import TeaDescriptionCard from '@/components/TeaCard/TeaDescriptionCard';
import TeaReviewCard from '@/components/TeaCard/TeaReviewCard';
import TeaRecipeCard from '@/components/TeaCard/TeaRecipeCard';

const meta: Meta = {
   title: 'Components/TeaComponents',
   component: TeaRecommendCard, // 기본 컴포넌트 설정
};

export default meta;
type Story = StoryObj;

export const RecommendCard: Story = {
   render: () => <TeaRecommendCard />,
};

export const RecommendSwiper: Story = {
   render: () => <TeaRecommendSwiper />,
};

export const DescriptionCard: Story = {
   render: () => <TeaDescriptionCard />,
};

export const ReviewCard: Story = {
   render: () => <TeaReviewCard />,
};
