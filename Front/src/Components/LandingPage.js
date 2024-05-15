import React from 'react';
import { Button, Typography, Container, Paper, Box, Grid } from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ElectreInfoTab from './ElectreInfoTab';
import Navbar from "./Navbar";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <Container maxWidth="md">
        <Box my={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledPaper elevation={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              Discover the Best AR Platforms
            </Typography>
            <Typography variant="body1" gutterBottom>
              Using the ELECTRE method, our tool helps you find the most suitable platforms for Augmented Reality applications based on multiple criteria comparison. ELECTRE stands for ELimination Et Choix Traduisant la REalité (Elimination and Choice Expressing Reality). It's a family of multi-criteria decision analysis methods that simulate the decision process to rank the options from the best to the worst.
            </Typography>
            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
              <Button variant="contained" color="primary" startIcon={<CalculateIcon />} size="large" onClick={() => navigate('/criteria')}>
                Start Analysis
              </Button>
            </Grid>
          </StyledPaper>
          <ElectreInfoTab />
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
