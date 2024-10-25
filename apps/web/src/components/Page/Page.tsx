import { useState, useEffect } from 'react';
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
  //const application = useApplication(); //this was already here, i didnt add this
  //console.log('application = ', application);

  const {
    activeDepartment,
    departments,
    subDepartments,
    updateActiveDepartment,
    updateDepartment,
    updateSubDepartment,
  } = useApplication();

  // setting up a state value to store the selected department
  const [dpt, setDpt] = useState('');

  // creating the reducer functions
  const handleActiveDepartmentChange = (newDepartment: string) => {
    updateActiveDepartment(newDepartment); // triggers the UPDATE_ACTIVE_DEPARTMENT action
  };

  //event handler to take care of when a deparments is selected
  const handleChange = (event: SelectChangeEvent) => {
    // setting the dpt state to the value from the select event
    //REMEMBER the hooks are asynchronous (so the value wont update imddeiantley to be displayed in the console log)
    setDpt(event.target.value as string);
    handleActiveDepartmentChange(event.target.value as string);

    //think the active derpamtent is the deparment that currently the state
    //application.activeDepartment = dpt;
  };

  //only want the data to be fetched when the component is rerendered
  useEffect(() => {
    //TODO MAYBE abstract this into a different file for later?
    // fetches data from the local api
    const fetchData = async () => {
      console.log(`FETCH DATA CALLED`);
      try {
        const response = await fetch('http://localhost:3002/api/departments');
        // converting into a json format
        const jresponse = await response.json();
        console.log(jresponse);

        // trying to connect the api call to the context? ---------TODO understand how to safely set the context value?
        updateDepartment({
          data: jresponse.departments,
          loading: false, //TODO figure out how to use the loading feature
          error: false,
        });
        //console.log('application 02 = ', application);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //console.log('APPLICATION error=', application.subDepartments.error);
  //application.subDepartments.error = false; //TODO find out where the error is being set then remove all this hardcoding

  //-----------place async console logs here!---------------
  //console.log(`++++++++++ AFTER dpt = ${dpt}`);
  //console.log('++++++++++++ application', application);
  console.log('++++++++++++++++ departments', departments);
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
                <Select value={dpt} onChange={handleChange}>
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
