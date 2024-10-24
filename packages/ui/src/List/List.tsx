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
  //this is what is being displayed previuolsy because the list was alwyas throwing an error
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
    //it was complaining about not having a unique key for each of the ListeIetms, so i added an index
    <MUIList>
      {items.map((item, index) => (
        <MUIListItem key={index}>{children({ item })}</MUIListItem>
      ))}
    </MUIList>
  );
};

export default List;
