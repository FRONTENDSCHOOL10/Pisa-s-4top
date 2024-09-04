import { Meta, StoryObj } from '@storybook/react';
import TeaDescriptionCard, {
   TeaDescriptionCardProps,
} from '../../components/TeaCard/TeaDescriptionCard';

const meta: Meta = {
   title: 'Components/TeaCard/TeaDescriptionCard',
   component: TeaDescriptionCard,
};

export default meta;

export const Default: StoryObj<TeaDescriptionCardProps> = {
   args: {
      title: '어떤 티인가요?',
      description: '트와이닝스 얼 그레이는 중국 홍차를 베이스로...',
   },
};
