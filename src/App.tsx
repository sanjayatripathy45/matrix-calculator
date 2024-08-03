// src/App.tsx
import React from 'react';
import MatrixGenerator from './component/MatrixGenerator';
import { Typography, Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      minHeight="100vh"
      p={2}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Matrix Calculator
      </Typography>
      <MatrixGenerator />
    </Box>
  );
};

export default App;
