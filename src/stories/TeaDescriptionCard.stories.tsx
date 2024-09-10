import { Meta, StoryObj } from '@storybook/react';
import {
   TeaDescriptionCard,
   TeaDescriptionCardProps,
} from '@/components/TeaCard/CardComponents';

const meta: Meta<TeaDescriptionCardProps> = {
   title: 'Components/Card/TeaDescriptionCard',
   component: TeaDescriptionCard,
   argTypes: {
      description: { control: 'text' }, // 컨트롤을 통해 UI에서 값을 조정할 수 있도록 설정
   },
};

export default meta;

type Story = StoryObj<TeaDescriptionCardProps>;

export const Default: Story = {
   args: {
      description: '이 티는 과일향이 강한 것이 특징입니다.',
   },
};
