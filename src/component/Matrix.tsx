import React, { useCallback, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";

// Define the props for the Matrix component
interface MatrixProps {
  rows: number; // Number of rows in the matrix
  cols: number; // Number of columns in the matrix
  matrix: number[][]; // 2D array representing the matrix values
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>; // Function to update the matrix state
}

// Matrix component definition
const Matrix: React.FC<MatrixProps> = ({ rows, cols, matrix, setMatrix }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle changes in cell values
  const handleChange = useCallback(
    (value: string, rowIndex: number, colIndex: number) => {
      // Convert value to number, default to 0 if empty
      const newValue = value === "" ? 0 : parseInt(value, 10);

      // Update the matrix state with the new value
      setMatrix((prevMatrix) =>
        prevMatrix.map((row, rIdx) =>
          rIdx === rowIndex
            ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell))
            : row
        )
      );
    },
    [setMatrix] // Dependency array: handleChange depends on setMatrix
  );

  return (
    <Box
      width="100%"
      height="400px"
      border={1}
      borderColor="grey.400"
      overflow="auto"
      p={1}
      bgcolor="background.paper"
      ref={containerRef} 
    >
      <Grid
        columnCount={cols}
        rowCount={rows} 
        columnWidth={100} 
        rowHeight={45} 
        width={500}
        height={400} 
      >
        {({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
          // Check if the current cell is within bounds
          if (rowIndex >= rows || columnIndex >= cols) return null;

          // Get the current value of the cell
          const cellValue = matrix[rowIndex]?.[columnIndex] ?? "";
          return (
            <div style={style}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={1}
                borderColor="grey.400"
                bgcolor="grey.100"
                p={0.5}
                minHeight="40px"
                width="100%"
                height="100%"
              >
                <TextField
                  type="number"
                  value={cellValue}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, columnIndex)
                  }
                  variant="standard" 
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      'input[type="number"]': {
                        textAlign: "center", 
                        padding: "0", 
                        border: "none", 
                        outline: "none", 
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                        width: "auto",
                        height: "100%",
                        minWidth: "50px",
                      },
                    
                    },
                  }}
                  inputProps={{
                    style: {
                      width: "100%", 
                      height: "100%", 
                      border: 'none', 
                      outline: 'none',
                    },
                  }}
                />
              </Box>
            </div>
          );
        }}
      </Grid>
    </Box>
  );
};

export default Matrix;
