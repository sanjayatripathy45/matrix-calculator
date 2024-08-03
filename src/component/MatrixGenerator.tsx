import React, { useCallback, useState } from 'react';
import { Box, TextField, Button, Container, Grid, Typography } from '@mui/material';
import Matrix from './Matrix';

// MatrixGenerator component definition
const MatrixGenerator: React.FC = () => {
  const [inputRows, setInputRows] = useState<number | ''>('');
  const [inputCols, setInputCols] = useState<number | ''>('');
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);

  const initializeMatrix = useCallback((rowCount: number, colCount: number, isMultiplication: boolean): number[][] => {
    return Array.from({ length: rowCount }, (_, rowIndex) =>
      Array.from({ length: colCount }, (_, colIndex) =>
        isMultiplication ? rowIndex * colIndex : rowIndex + colIndex
      )
    );
  }, []);

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
    setMatrixA(initializeMatrix(parsedRows, parsedCols, false));
    setMatrixB(initializeMatrix(parsedRows, parsedCols, true));
    setResult(null);
  };

  const handleAdd = () => {
    const resultMatrix = matrixA.map((row, rowIndex) =>
      row.map((value, colIndex) => value + (matrixB[rowIndex]?.[colIndex] || 0))
    );
    setResult(resultMatrix);
  };

  const handleSubtract = () => {
    const resultMatrix = matrixA.map((row, rowIndex) =>
      row.map((value, colIndex) => value - (matrixB[rowIndex]?.[colIndex] || 0))
    );
    setResult(resultMatrix);
  };

  const handleMultiply = () => {
    const resultMatrix = matrixA.map((row, rowIndex) =>
      row.map((value, colIndex) => value * (matrixB[rowIndex]?.[colIndex] || 0))
    );
    setResult(resultMatrix);
  };

  return (
    <Container>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
          <Button variant="contained" onClick={handleGenerate} fullWidth>Generate</Button>
        </Grid>
      </Grid>
      {(rows > 0 && cols > 0) && (
        <Box mb={2} display="flex" justifyContent="center" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          <Box width={{ xs: '100%', md: '45%' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Matrix A
            </Typography>
            <Box display="flex" justifyContent="center">
              <Matrix rows={rows} cols={cols} matrix={matrixA} setMatrix={setMatrixA} />
            </Box>
          </Box>
          <Box width={{ xs: '100%', md: '45%' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Matrix B
            </Typography>
            <Box display="flex" justifyContent="center">
              <Matrix rows={rows} cols={cols} matrix={matrixB} setMatrix={setMatrixB} />
            </Box>
          </Box>
        </Box>
      )}
      {rows > 0 && cols > 0 && (
        <Grid container spacing={2} mb={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={handleAdd} fullWidth>Add Matrices</Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={handleSubtract} fullWidth>Subtract Matrices</Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" onClick={handleMultiply} fullWidth>Multiply Matrices</Button>
          </Grid>
        </Grid>
      )}
      {result && (
        <Box mt={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Result
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
            <Matrix rows={rows} cols={cols} matrix={result} setMatrix={() => {}} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MatrixGenerator;
