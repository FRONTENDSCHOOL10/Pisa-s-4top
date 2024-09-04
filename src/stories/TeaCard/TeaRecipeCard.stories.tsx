import { Meta, StoryObj } from '@storybook/react';
import TeaRecipeCard, {
   TeaRecipeCardProps,
} from '@/components/TeaCard/TeaRecipeCard';

const meta: Meta = {
   title: 'Components/TeaCard/TeaRecipeCard',
   component: TeaRecipeCard,
};

export default meta;

export const Default: StoryObj<TeaRecipeCardProps> = {
   args: {
      title: '이렇게도 드실 수 있어요!',
      imageUrl:
         'https://totd.pockethost.io/api/files/ba37rtzuoyf8a76/rdz34ahzyaxwjal/iced_tea_TH78Nnewod.svg',
      steps: [
         '티백 2개를 뜨거운 물(100°C) 200ml에 넣고 5분 동안 진하게 우려낸다.',
         '홍차에 설탕 2 티스푼을 넣고 녹을 때까지 잘 젓는다.(원하는 과일청 60ml도 가능)',
         '잔에 얼음을 가득 담고 홍차를 부어 식힌다.',
         '레몬 슬라이스나 민트로 장식한다.',
      ],
   },
};
