import type { Meta, StoryObj } from '@storybook/react';
import {
   ButtonSmall,
   ButtonMedium,
   ButtonLarge,
   ButtonLargeError,
   ButtonXlarge,
   ButtonHeart,
   ButtonHeartSmall,
   ButtonHeartSmallwithCount,
} from '../components/Buttons/Buttons';

const meta: Meta = {
   title: 'Components/Buttons',
   component: ButtonSmall, // 기본 컴포넌트 설정 (스토리 간 공통 부분)
};

export default meta;
type Story = StoryObj;

export const Small: Story = {
   render: () => <ButtonSmall />,
};

export const Medium: Story = {
   render: () => <ButtonMedium />,
};

export const Large: Story = {
   render: () => <ButtonLarge />,
};

export const LargeError: Story = {
   render: () => <ButtonLargeError />,
};

export const XLarge: Story = {
   render: () => <ButtonXlarge />,
};
