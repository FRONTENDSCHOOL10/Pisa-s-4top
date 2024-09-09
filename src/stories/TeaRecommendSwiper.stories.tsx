import { Meta, StoryObj } from '@storybook/react';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import { TeaRecommendCardProps } from '@/components/TeaCard/CardComponents';

const meta: Meta = {
   title: 'Components/TeaCard/TeaRecommendSwiper',
   component: TeaRecommendSwiper,
};

export default meta;

export const Default: StoryObj<{
   teaRecommendations: TeaRecommendCardProps[];
}> = {
   args: {
      teaRecommendations: [
         {
            imageUrl: '',
            teaName: 'English Breakfast',
            brand: 'TWINING',
         },
         {
            imageUrl: '',
            teaName: 'Earl Grey',
            brand: 'TWINING',
         },
         {
            imageUrl: '',
            teaName: 'Green Tea',
            brand: 'Lipton',
         },
      ],
   },
};
