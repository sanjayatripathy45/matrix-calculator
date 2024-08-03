import React, { useCallback, useState } from 'react';
import { Box, TextField, Button, Container, Grid, Typography } from '@mui/material';
import Matrix from './Matrix';

// MatrixGenerator component definition
const MatrixGenerator: React.FC = () => {
  // State to store user input for rows and columns
  const [inputRows, setInputRows] = useState<number | ''>('');
  const [inputCols, setInputCols] = useState<number | ''>('');
  // State to store matrix dimensions and matrix values
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);

  // Initialize a matrix with specific values
  const initializeMatrix = useCallback((rowCount: number, colCount: number, isMultiplication: boolean): number[][] => {
    return Array.from({ length: rowCount }, (_, rowIndex) =>
      Array.from({ length: colCount }, (_, colIndex) =>
        isMultiplication ? rowIndex * colIndex : rowIndex + colIndex
      )
    );
  }, []);

  // Handle matrix generation based on user input
  const handleGenerate = () => {
    if (inputRows === '' || inputCols === '') {
      console.error('Rows and Columns cannot be empty');
      return;
    }

    const parsedRows = typeof inputRows === 'number' ? inputRows : parseInt(inputRows, 10);
    const parsedCols = typeof inputCols === 'number' ? inputCols : parseInt(inputCols, 10);
    
    if (isNaN(parsedRows) || isNaN(parsedCols) || parsedRows < 0 || parsedCols < 0) {
      console.error('Invalid input for Rows or Columns');
      return;
    }

    setRows(parsedRows);
    setCols(parsedCols);
    // Initialize matrices A and B with specific values
    setMatrixA(initializeMatrix(parsedRows, parsedCols, false));
    setMatrixB(initializeMatrix(parsedRows, parsedCols, true));
    setResult(null); // Clear previous result
  };

  // Handle matrix addition
  const handleAdd = () => {
    const resultMatrix = matrixA.map((row, rowIndex) =>
      row.map((value, colIndex) => value + (matrixB[rowIndex]?.[colIndex] || 0))
    );
    setResult(resultMatrix);
  };

  // Handle matrix subtraction
  const handleSubtract = () => {
    const resultMatrix = matrixA.map((row, rowIndex) =>
      row.map((value, colIndex) => value - (matrixB[rowIndex]?.[colIndex] || 0))
    );
    setResult(resultMatrix);
  };

  // Handle matrix multiplication
  const handleMultiply = () => {
    const resultMatrix = matrixA.map((row, rowIndex) =>
      row.map((value, colIndex) => value * (matrixB[rowIndex]?.[colIndex] || 0))
    );
    setResult(resultMatrix);
  };

  return (
    <Container>
      {/* Input fields for rows and columns */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <TextField
            label="Rows"
            type="number"
            value={inputRows}
            onChange={(e) => setInputRows(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            fullWidth
            variant="outlined"
            inputProps={{ min: 0, step: 1 }} 
            InputProps={{ sx: { border: 'none', outline: 'none' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Columns"
            type="number"
            value={inputCols}
            onChange={(e) => setInputCols(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            fullWidth
            variant="outlined"
            inputProps={{ min: 0, step: 1 }} 
            InputProps={{ sx: { border: 'none', outline: 'none' } }}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button variant="contained" onClick={handleGenerate}>Generate</Button>
        </Grid>
      </Grid>
      {/* Display matrices A and B */}
      {(rows > 0 && cols > 0) && (
        <Box mb={2} display="flex" justifyContent="center" alignItems="center" gap={2}>
          <Box width="45%">
            <Typography variant="h6" align="center" gutterBottom>
              Matrix A
            </Typography>
            <Box display="flex" justifyContent="center">
              <Matrix rows={rows} cols={cols} matrix={matrixA} setMatrix={setMatrixA} />
            </Box>
          </Box>
          <Box width="45%">
            <Typography variant="h6" align="center" gutterBottom>
              Matrix B
            </Typography>
            <Box display="flex" justifyContent="center">
              <Matrix rows={rows} cols={cols} matrix={matrixB} setMatrix={setMatrixB} />
            </Box>
          </Box>
        </Box>
      )}
      {/* Buttons to perform matrix operations */}
      {rows > 0 && cols > 0 && (
        <Grid container spacing={2} mb={2} justifyContent="center">
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleAdd}>Add Matrices</Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleSubtract}>Subtract Matrices</Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleMultiply}>Multiply Matrices</Button>
          </Grid>
        </Grid>
      )}
      {/* Display result if available */}
      {result && (
        <Box mt={2} display="flex" justifyContent="center" alignItems="center" sx={{ border: 'none', outline: 'none' }}>
          <Box>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Result
            </Typography>
            <Box display="flex" justifyContent="center" sx={{ border: 'none', outline: 'none' }}>
              <Matrix rows={rows} cols={cols} matrix={result} setMatrix={() => {}} />
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MatrixGenerator;
