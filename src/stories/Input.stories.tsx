import Input from '@/components/Input/Input';
import SearchInput from '@/components/Input/SearchInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
   title: 'Components/Input',
   component: Input, // 기본 컴포넌트 설정
};

export default meta;
type Story = StoryObj;

export const Email: Story = {
   render: () => <Input title="이메일" type="email" />,
};

export const Password: Story = {
   render: () => <Input title="비밀번호" type="password" />,
};

export const NickName: Story = {
   render: () => <Input title="닉네임" type="text" />,
};

export const Search: Story = {
   render: () => (
      <SearchInput
         onClick={() => {
            alert('클릭');
         }}
      />
   ),
};
