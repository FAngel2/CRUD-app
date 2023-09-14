import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to Your Inventory Manager
      </Typography>
      <Typography variant="body1" paragraph>
        As an inventory manager, you can track, manage, and share your inventory of items with ease.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/inventory"
      >
        View Inventory
      </Button>
    </Container>
  );
};

export default Home;