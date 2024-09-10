import { Meta, StoryObj } from '@storybook/react';
import { UserActivity, UserActivityProps } from '@/components/User/UserActivity'; // 경로는 실제 위치에 맞게 조정해 주세요

const meta: Meta<typeof UserActivity> = {
   title: 'Components/UserActivity',
   component: UserActivity,
   argTypes: {
      ariaLabel: { control: 'text' },
      title: { control: 'text' },
      count: { control: 'number' },
   },
};

export default meta;

export const Default: StoryObj<UserActivityProps> = {
   args: {
      title: '찜 개수',
      count: 999,
      ariaLabel: '찜 개수 999개',
   },
};
