import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelWarning } from './../components/Labels/Labels';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta = {
   title: 'Components/Labels',
   component: Label,
   decorators: [
      (Story) => (
         <MemoryRouter>
            <Story />
         </MemoryRouter>
      ),
   ],
   argTypes: {
      taste: { control: 'text' },
      isButton: { control: 'boolean' },
   },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
   args: {
      taste: '🍒 체리',
   },
};

export const Warning: Story = {
   render: () => <LabelWarning />,
};

export const Button: Story = {
   args: {
      taste: '🍒 체리',
      isButton: true,
   },
};
