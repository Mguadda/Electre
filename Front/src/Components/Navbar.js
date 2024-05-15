import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToCriteria = () => {
    navigate('/Criteria');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif'
          }} 
          onClick={goToHome}
        >
          AR Platforms Ranker
        </Typography>
        <Button color="inherit" onClick={goToCriteria}>
          Electre
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
