import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonHeart, ButtonHeartwithCount } from '@/components/Buttons/Buttons'; // 통합된 버튼 컴포넌트 및 Heart 버튼들

const meta: Meta = {
   title: 'Components/Buttons',
   component: Button,
   argTypes: {
      totalLike: { control: 'number' },
      onToggle: { action: 'clicked' },
   },
};

export default meta;

type ButtonStory = StoryObj<typeof Button>; 
type ButtonHeartStory = StoryObj<typeof ButtonHeart>;
type ButtonHeartwithCountStory = StoryObj<typeof ButtonHeartwithCount>;

export const Default: ButtonStory = {
   render: () => (
      <Button
         content="Small Button"
         size="small"
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const FullWidth: ButtonStory = {
   render: () => (
      <Button
         content="Full Width Button"
         size="fullWidth"
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const FullWidthError: ButtonStory = {
   render: () => (
      <Button
         content="FullWidth Error Button"
         size="fullWidth"
         isError={true}
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const Large: ButtonStory = {
   render: () => (
      <Button
         content="Large Button"
         size="large"
         handleClick={() => console.log('Clicked')}
      />
   ),
};

export const Heart: ButtonHeartStory = {
   render: () => (
      <ButtonHeart
         type="button"
         onToggle={() => console.log('찜 버튼 토글됨')}
      />
   ),
};

export const HeartWithCount: ButtonHeartwithCountStory = {
   render: (args) => <ButtonHeartwithCount {...args} />,
   args: {
      totalLike: 10,
      onToggle: () => console.log('찜 카운트 버튼 토글됨'),
   },
};
