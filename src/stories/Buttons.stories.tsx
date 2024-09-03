import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
   ButtonSmall,
   ButtonMedium,
   ButtonLarge,
   ButtonLargeError,
   ButtonXlarge,
} from '../components/Buttons/Buttons';

export default {
   title: 'Components/Buttons',
} as Meta;

export const Small: StoryFn = () => <ButtonSmall />;
export const Medium: StoryFn = () => <ButtonMedium />;
export const Large: StoryFn = () => <ButtonLarge />;
export const LargeError: StoryFn = () => <ButtonLargeError />;
export const XLarge: StoryFn = () => <ButtonXlarge />;
