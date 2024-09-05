import { Meta, StoryObj } from '@storybook/react';
import SplashSwiper from '@/components/TeaCard/SplashSwiper';

const meta: Meta<typeof SplashSwiper> = {
   title: 'Components/TeaCard/SplashSwiper',
   component: SplashSwiper,
};

export default meta;

type Story = StoryObj<typeof SplashSwiper>;

export const Default: Story = {
   args: {},
};
