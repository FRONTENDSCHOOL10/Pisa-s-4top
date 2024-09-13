import { Meta, StoryObj } from '@storybook/react';
import { TeaColorCard } from '@/components/TeaCard/CardComponents';

const meta: Meta<typeof TeaColorCard> = {
   title: 'Components/Card/TeaColorCard',
   component: TeaColorCard,
   parameters: {
      docs: {
         description: {
            component:
               '티의 수색을 기록할 때 선택할 색상을 제공하는 카드 컴포넌트입니다. `SelectColor` 컴포넌트를 통해 사용자가 색상을 선택할 수 있습니다.',
         },
      },
   },
};

export default meta;

type Story = StoryObj<typeof TeaColorCard>;

export const Default: Story = {};
