import SearchInput from '@/components/Input/SearchInput';
import type { Meta, StoryObj } from '@storybook/react';

const searchMeta: Meta<typeof SearchInput> = {
   title: 'Components/Input/SearchInput',
   component: SearchInput,
};

export default searchMeta;

export const Search: StoryObj<typeof SearchInput> = {
   args: {
      onClick: () => {
         alert('클릭');
      },
   },
};
