import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelWarning } from './../components/Labels/Labels';

const meta: Meta = {
   title: 'Components/Labels',
   component: Label,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
   render: () => <Label />,
};

export const Warning: Story = {
   render: () => <LabelWarning />,
};

export const LabelButton: Story = {
   render: () => <Label isButton={true} />,
};
