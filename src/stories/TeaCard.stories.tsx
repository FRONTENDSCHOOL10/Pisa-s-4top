import { Meta, StoryFn } from '@storybook/react';
import TeaRecommendCard from '@/components/TeaCard/TeaRecommendCard';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import TeaDescriptionCard from '@/components/TeaCard/TeaDescriptionCard';
import TeaReviewCard from '@/components/TeaCard/TeaReviewCard';

export default {
   title: 'Components/TeaComponents',
} as Meta;

export const RecommendCard: StoryFn = () => <TeaRecommendCard />;
export const RecommendSwiper: StoryFn = () => <TeaRecommendSwiper />;
export const DescriptionCard: StoryFn = () => <TeaDescriptionCard />;
export const ReviewCard: StoryFn = () => <TeaReviewCard />;
