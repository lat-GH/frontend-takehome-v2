import React, { useState } from 'react';
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

// import {
//   getDepartments,
//   getDepartment,
//   DepartmentKeys,
// } from '../../../../api/src/departments/model';

const Page = () => {
  const application = useApplication();

  //console.log(getDepartment('beauty')); //trailing the use of the controller directly? only place i can find the 'searchTerm'

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/departments');
      const jresponse = await response.json();
      console.log(jresponse);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  const [dpt, setDpt] = React.useState('default');

  const handleChange = (event: SelectChangeEvent) => {
    setDpt(event.target.value as string);
  };

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
                <InputLabel id="select-label">Options</InputLabel>
                <Select
                  labelId="select-label"
                  value={dpt}
                  label="label"
                  onChange={handleChange}>
                  <MenuItem value="test01">option1</MenuItem>
                  <MenuItem value="test02">option2</MenuItem>
                  <MenuItem value="test03">option3</MenuItem>
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
