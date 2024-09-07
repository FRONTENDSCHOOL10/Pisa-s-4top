import type { Meta, StoryObj } from '@storybook/react';
import {
   ButtonDefault,
   ButtonFullWidth,
   ButtonLarge,
   ButtonHeart,
   ButtonHeartwithCount,
} from '@/components/Buttons/Buttons';

const meta: Meta = {
   title: 'Components/Buttons',
   component: ButtonDefault, // 기본 컴포넌트 설정 (필요에 따라 변경)
   argTypes: {
      totalLike: { control: 'number' },
      onToggle: { action: 'clicked' },
   },
};

export default meta;

type ButtonDefaultStory = StoryObj<typeof ButtonDefault>;
type ButtonHeartwithCountStory = StoryObj<typeof ButtonHeartwithCount>;

export const Default: ButtonDefaultStory = {
   render: () => (
      <ButtonDefault
         content="Default Button"
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const FullWidth: ButtonDefaultStory = {
   render: () => (
      <ButtonFullWidth
         content="Full Width Button"
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const FullWidthError: ButtonDefaultStory = {
   render: () => (
      <ButtonFullWidth
         content="Full Width Error Button"
         isError={true}
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const Large: ButtonDefaultStory = {
   render: () => (
      <ButtonLarge
         content="Large Button"
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const Heart: ButtonDefaultStory = {
   render: () => (
      <ButtonHeart
         type="button"
         onToggle={() => console.log('찜 버튼 토글됨')}
      />
   ),
};

export const HeartWithCount: ButtonHeartwithCountStory = {
   render: (args) => (
      <ButtonHeartwithCount
         {...args}
      />
   ),
   args: {
      totalLike: 10,
      onToggle: () => console.log('찜 버튼 토글됨'),
   },
};
