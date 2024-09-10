import { Meta, StoryObj } from '@storybook/react';
import {
   TeaRecipeCard,
   TeaRecipeCardProps,
} from '@/components/TeaCard/CardComponents';

const meta: Meta<TeaRecipeCardProps> = {
   title: 'Components/Card/TeaRecipeCard',
   component: TeaRecipeCard,
   argTypes: {
      title: { control: 'text' },
      imageUrl: { control: 'text' },
      steps: { control: 'array' },
   },
};

export default meta;

type Story = StoryObj<TeaRecipeCardProps>;

export const Default: Story = {
   args: {
      title: '레시피 타이틀',
      imageUrl:
         'https://totd.pockethost.io/api/files/ba37rtzuoyf8a76/rdz34ahzyaxwjal/iced_tea_TH78Nnewod.svg',
      steps: [
         '1. 물을 끓입니다.',
         '2. 티를 우립니다.',
         '3. 티를 따뜻하게 즐깁니다.',
      ],
   },
};
