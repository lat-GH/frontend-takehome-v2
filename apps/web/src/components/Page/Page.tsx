import { useApplication } from '../../contexts/ApplicationContext';
import { List } from '@repo/ui';
import { Box, Grid, ListItemText, Typography } from '@mui/material';

const Page = () => {
  const application = useApplication();

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: '1200px',
        width: '100%',
        mt: 4,
        mx: 'auto',
        px: 6.5,
      }}>
      <Grid container columnSpacing={2} item={true}>
        <Grid xs={4} item={true}>
          <Box sx={{ px: 2 }}>{/* insert select box here */}</Box>
        </Grid>
        <Grid xs={8} item={true}>
          <Box sx={{ px: 2 }}>
            {application.activeDepartment !== null && (
              <List
                items={application.subDepartments.data}
                loading={application.subDepartments.loading}
                error={application.subDepartments.error}
                loadingCount={15}>
                {({ item }) => <ListItemText>{item}</ListItemText>}
              </List>
            )}
            {application.activeDepartment === null && (
              <>
                <Typography>
                  Select a department to see a list of sub-departments.
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
