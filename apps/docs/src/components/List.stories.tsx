import type { Meta, StoryObj } from '@storybook/react';
import { List, ListProps } from '@repo/ui';
import { Typography } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/List',
  component: List,
} satisfies Meta<ListProps<{ id: string; name: string }>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 'apparel', name: 'Apparel' },
      { id: 'shoes', name: 'Shoes' },
      { id: 'accessories', name: 'Accessories' },
      { id: 'jewelry', name: 'Jewelry' },
      { id: 'handbags', name: 'Handbags' },
      { id: 'eyewear', name: 'Eyewear' },
      { id: 'watches', name: 'Watches' },
      { id: 'beauty', name: 'Beauty' },
    ],
    loading: false,
    error: false,
    children: ({ item }) => <Typography>{item.name}</Typography>,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    error: false,
    children: ({ item }) => <Typography>{item.name}</Typography>,
  },
};

export const Error: Story = {
  args: {
    items: [],
    loading: false,
    error: true,
    children: ({ item }) => <Typography>{item.name}</Typography>,
  },
};
