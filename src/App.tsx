import React from 'react';
import Navbar from './components/navbar/navbar';
import { Box } from '@mui/material';
import classes from './app.module.css';

function App() {
  return (
    <>
      <Navbar/>
      <Box className={classes.hero}>
        <Box className={classes.image_container}>
        </Box>
        <Box className={classes.hero_title_container}>
              <h1>Sweat now, shine later.</h1>
        </Box>
      </Box>
        <Box sx={{height:'87vh'}}>

        </Box>
    </>
  );
}

export default App;
