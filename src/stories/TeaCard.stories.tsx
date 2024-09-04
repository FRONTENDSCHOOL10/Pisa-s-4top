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
   render: () => <TeaRecommendCard />,
};

export const RecommendSwiper: StoryObj<typeof TeaRecommendSwiper> = {
   render: () => <TeaRecommendSwiper />,
};

export const DescriptionCard: StoryObj<typeof TeaDescriptionCard> = {
   render: () => <TeaDescriptionCard />,
};

export const ReviewCard: StoryObj<typeof TeaReviewCard> = {
   render: () => <TeaReviewCard />,
};

export const RecipeCard: StoryObj<typeof TeaRecipeCard> = {
   render: () => <TeaRecipeCard />,
};
