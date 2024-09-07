import { Meta, StoryObj } from '@storybook/react';
import { UserStatus, UserStatusProps } from '@/components/User/UserStatus'; // 경로는 실제 위치에 맞게 조정해 주세요

const meta: Meta<typeof UserStatus> = {
   title: 'Components/UserStatus',
   component: UserStatus,
   argTypes: {
      ariaLabel: { control: 'text' },
      title: { control: 'text' },
      count: { control: 'number' },
   },
};

export default meta;

export const Default: StoryObj<UserStatusProps> = {
   args: {
      title: '찜 개수',
      count: 999,
      ariaLabel: '찜 개수 999개',
   },
};
