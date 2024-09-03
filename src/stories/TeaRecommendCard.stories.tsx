import { Meta, StoryFn } from '@storybook/react';
import TeaRecommendCard from '../components/TeaCard/TeaRecommendCard';
import TeaRecommendSwiper from '../components/TeaCard/TeaRecommendSwiper';

export default {
   title: 'Components/TeaComponents',
} as Meta;

export const Card: StoryFn = () => <TeaRecommendCard />;
export const Swiper: StoryFn = () => <TeaRecommendSwiper />;
