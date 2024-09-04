import CheckBox from '@/components/Input/CheckBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
   title: 'Components/Input',
   component: CheckBox, // 기본 컴포넌트 설정
};

export default meta;
type Story = StoryObj;

export const TermsOfServiceCheckBox: Story = {
   render: () => <CheckBox title="약관에 동의합니다." id="agree" />,
};

export const AutoLoginCheckBox: Story = {
   render: () => <CheckBox title="자동 로그인" id="login" />,
};
