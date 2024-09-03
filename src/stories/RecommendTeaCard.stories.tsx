import { Meta, StoryFn } from '@storybook/react';
import TeaRecommendCard from '../components/TeaRecommendCard';

export default {
   title: 'Components/TeaRecommendCard',
   component: TeaRecommendCard,
} as Meta;

const Template: StoryFn = () => <TeaRecommendCard />;

export const Default = Template.bind({});
