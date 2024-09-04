import { Meta, StoryObj } from '@storybook/react';
import TeaRecommendCard, {
   TeaRecommendCardProps,
} from '../../components/TeaCard/TeaRecommendCard';

const meta: Meta = {
   title: 'Components/TeaCard/TeaRecommendCard',
   component: TeaRecommendCard,
};

export default meta;

export const Default: StoryObj<TeaRecommendCardProps> = {
   args: {
      imageUrl: '',
      teaName: 'English Breakfast',
      brand: 'TWINING',
   },
};
