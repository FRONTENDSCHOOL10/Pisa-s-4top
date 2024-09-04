import Input from '@/components/Input/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
   title: 'Components/Input/Input',
   component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Email: Story = {
   args: {
      title: '이메일',
      type: 'email',
   },
};

export const Password: Story = {
   args: {
      title: '비밀번호',
      type: 'password',
   },
};

export const NickName: Story = {
   args: {
      title: '닉네임',
      type: 'text',
   },
};
