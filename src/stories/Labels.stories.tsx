import { Meta, StoryFn } from '@storybook/react';
import { Label, LabelWarning } from './../components/Labels/Labels';

export default {
  title: 'Components/Labels',
} as Meta;

export const label: StoryFn = () => <Label />;
export const warning: StoryFn = () => <LabelWarning/>;
export const labelButton: StoryFn = () => <Label isButton={true}/>;