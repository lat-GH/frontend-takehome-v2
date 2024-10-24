import React, { useState, useEffect } from 'react';
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
  const application = useApplication();
  //console.log('application = ', application);

  // setting up a state value to store the selected department
  const [dpt, setDpt] = React.useState('');

  //event handler to take care of when a deparments is selected
  const handleChange = (event: SelectChangeEvent) => {
    // setting the dpt state to the value from the select event
    setDpt(event.target.value as string);

    //TODO i think the active derpamtent is the deparment that currently the state
    //application.activeDepartment = dpt;
  };

  //only want the data to be fetched when the component is rerendered
  useEffect(() => {
    // fetches data from the local api
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/departments');
        // converting into a json format
        const jresponse = await response.json();
        console.log(jresponse);

        // trying to connect the api call to the context? ---------TODO understand how to safely set the context value?
        application.departments.data = jresponse.departments;
        console.log('application 02 = ', application);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
                  {application.departments.data.map((option: any) => (
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
