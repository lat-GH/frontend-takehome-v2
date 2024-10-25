import { useEffect } from 'react';
import { useApplication } from '../../contexts/ApplicationContext';
import { List } from '@repo/ui';
import {
  Box,
  Grid,
  ListItemText,
  Typography,
  MenuItem,
  InputLabel,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// The main page
const Page = () => {
  //created a context that can be used to access the stage logic from the Reducers
  // contains both the state values and the state functions
  const {
    activeDepartment,
    departments,
    subDepartments,
    updateActiveDepartment,
    updateDepartment,
    updateSubDepartment,
  } = useApplication();

  const handleSelection = (event: SelectChangeEvent) => {
    //using the context function to access the reducer to update the state logic
    updateActiveDepartment(event.target.value as string);
  };

  useEffect(() => {
    //TODO MAYBE abstract this into a different file for later?
    const fetchDepartments = async () => {
      //console.log(`FETCH DATA CALLED`);
      try {
        const response = await fetch('http://localhost:3002/api/departments');
        const jresponse = await response.json();
        console.log(jresponse);

        updateDepartment({
          data: jresponse.departments,
          loading: false, //TODO figure out how to use the loading feature
          error: false,
        });
      } catch (error) {
        console.error(error);
      }
    };
    //only want the data to be fetched when the component is rerendered
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchSubDepartments = async () => {
      //console.log(`FETCH SUB DATA CALLED`);
      try {
        const response = await fetch(
          `http://localhost:3002/api/departments/${activeDepartment}`
        );
        const jresponse = await response.json();
        console.log(jresponse);

        updateSubDepartment({
          data: jresponse.department.subDepartments,
          loading: false, //TODO figure out how to use the loading feature
          error: false,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubDepartments();
    //fetches the data when the activeDepartment changes
  }, [activeDepartment]);

  //-----------place async console logs here!---------------
  //console.log('++++++++++++++++ departments', departments);
  //console.log('++++++++++++++++ activeDepartment', activeDepartment);

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
          <Box sx={{ px: 2 }}>
            {
              <div>
                <InputLabel id="select-label">Departments</InputLabel>
                <Select value={activeDepartment} onChange={handleSelection}>
                  {departments.data.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            }
          </Box>
        </Grid>
        <Grid xs={8} item={true}>
          <Box sx={{ px: 2 }}>
            {activeDepartment !== null && (
              <List
                items={subDepartments.data}
                loading={subDepartments.loading}
                error={subDepartments.error}
                loadingCount={15}>
                {({ item }) => <ListItemText>{item}</ListItemText>}
              </List>
            )}
            {activeDepartment === null && (
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
