import type { Meta, StoryObj } from '@storybook/react';
import TeaRecommendCard from '@/components/TeaCard/TeaRecommendCard';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import TeaDescriptionCard from '@/components/TeaCard/TeaDescriptionCard';
import TeaReviewCard from '@/components/TeaCard/TeaReviewCard';
import TeaRecipeCard from '@/components/TeaCard/TeaRecipeCard';

const meta: Meta<typeof TeaRecommendCard> = {
   title: 'Components/TeaComponents',
   component: TeaRecommendCard,
};

export default meta;
type Story = StoryObj<typeof TeaRecommendCard>;

export const RecommendCard: Story = {
   args: {},
};

export const RecommendSwiper: StoryObj<typeof TeaRecommendSwiper> = {
   args: {},
};

export const DescriptionCard: StoryObj<typeof TeaDescriptionCard> = {
   args: {},
};

export const ReviewCard: StoryObj<typeof TeaReviewCard> = {
   args: {},
};

export const RecipeCard: StoryObj<typeof TeaRecipeCard> = {
   args: {},
};
