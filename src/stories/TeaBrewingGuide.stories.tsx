import { Meta, StoryObj } from '@storybook/react';
import {
   TeaBrewingGuide,
   TeaBrewingGuideProps,
} from '@/components/TeaCard/TeaBrewingGuide';

const meta: Meta<TeaBrewingGuideProps> = {
   title: 'Components/TeaCard/TeaBrewingGuide',
   component: TeaBrewingGuide,
   argTypes: {
      teaAmount: { control: 'number' },
      waterAmount: { control: 'number' },
      temperature: { control: 'number' },
      time: { control: 'number' },
      teaUnit: { control: 'text' },
      waterUnit: { control: 'text' },
      tempUnit: { control: 'text' },
      timeUnit: { control: 'text' },
      ariaLabel: { control: 'text' },
   },
};

export default meta;

export const Default: StoryObj<TeaBrewingGuideProps> = {
   args: {
      teaAmount: 5,
      waterAmount: 200,
      temperature: 90,
      time: 4,
      teaUnit: 'g',
      waterUnit: 'ml',
      tempUnit: '°C',
      timeUnit: 'min',
      ariaLabel: '최적의 티 우리기 가이드',
   },
};
