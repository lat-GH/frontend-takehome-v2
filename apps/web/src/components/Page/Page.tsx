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
  const {
    activeDepartment,
    departments,
    subDepartments,
    updateActiveDepartment,
    updateDepartment,
    updateSubDepartment,
  } = useApplication();

  //event handler to take care of when a deparments is selected
  const handleChange = (event: SelectChangeEvent) => {
    // setting the state to the value from the select event
    updateActiveDepartment(event.target.value as string);
  };

  //only want the data to be fetched when the component is rerendered
  useEffect(() => {
    //TODO MAYBE abstract this into a different file for later?
    // fetches data from the local api
    const fetchDepartments = async () => {
      //console.log(`FETCH DATA CALLED`);
      try {
        const response = await fetch('http://localhost:3002/api/departments');
        // converting into a json format
        const jresponse = await response.json();
        // console.log(jresponse);

        updateDepartment({
          data: jresponse.departments,
          loading: false, //TODO figure out how to use the loading feature
          error: false,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchSubDepartments = async () => {
      console.log(`FETCH SUB DATA CALLED`);
      try {
        const response = await fetch(
          `http://localhost:3002/api/departments/${activeDepartment}`
        );
        // converting into a json format
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
  }, [activeDepartment]);

  //-----------place async console logs here!---------------
  //console.log('++++++++++++++++ departments', departments);
  console.log('++++++++++++++++ activeDepartment', activeDepartment);

  return (
    <Box
      //setting up the dimensions
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
              //my select component
              <div>
                <InputLabel id="select-label">Departments</InputLabel>
                <Select value={activeDepartment} onChange={handleChange}>
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
