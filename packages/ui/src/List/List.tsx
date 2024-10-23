import { ReactNode } from 'react';
import {
  Box,
  List as MUIList,
  ListItem as MUIListItem,
  Skeleton,
  Typography,
} from '@mui/material';

export interface ListProps<T = unknown> {
  items: Array<T>;
  loading: boolean;
  error: boolean;
  loadingCount?: number;
  children: (props: { item: T }) => ReactNode;
}

const List = <T = unknown,>({
  items,
  loading,
  loadingCount,
  error,
  children,
}: ListProps<T>): ReactNode => {
  if (loading) {
    return (
      <MUIList>
        {[...new Array(loadingCount || 5)].map((_) => (
          <Skeleton animation="wave" width="100%" height="48px" />
        ))}
      </MUIList>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 2.5 }}>
        <Typography>An error occured when fetching.</Typography>
      </Box>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Box sx={{ py: 2.5 }}>
        <Typography>No items available</Typography>
      </Box>
    );
  }

  return (
    <MUIList>
      {items.map((item) => (
        <MUIListItem>{children({ item })}</MUIListItem>
      ))}
    </MUIList>
  );
};

export default List;
