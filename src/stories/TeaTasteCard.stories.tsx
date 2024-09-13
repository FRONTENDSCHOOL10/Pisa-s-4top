import { Meta, StoryObj } from '@storybook/react';
import { TeaTasteCard } from '@/components/TeaCard/CardComponents';

const meta: Meta<typeof TeaTasteCard> = {
   title: 'Components/Card/TeaTasteCard',
   component: TeaTasteCard,
   parameters: {
      docs: {
         description: {
            component:
               '사용자가 선택할 수 있는 티의 다양한 맛을 보여주는 카드 컴포넌트입니다. `LabelGroup`을 사용하여 여러 맛을 표시합니다.',
         },
      },
   },
};

export default meta;

type Story = StoryObj<typeof TeaTasteCard>;

export const Default: Story = {};
