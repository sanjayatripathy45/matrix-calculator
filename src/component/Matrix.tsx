import React, { useCallback, useRef, useState } from "react";
import { Box, TextField } from "@mui/material";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";

interface MatrixProps {
  rows: number;
  cols: number;
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
}

const Matrix: React.FC<MatrixProps> = ({ rows, cols, matrix, setMatrix }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<number>(20);

  const handleChange = useCallback(
    (value: string, rowIndex: number, colIndex: number) => {
      // Parse input value, or default to 0 if it's an invalid number
      const newValue = value === "" ? 0 : parseInt(value, 10);

      setMatrix((prevMatrix) =>
        prevMatrix.map((row, rIdx) =>
          rIdx === rowIndex
            ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell))
            : row
        )
      );
    },
    [setMatrix]
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
          if (rowIndex >= rows || columnIndex >= cols) return null;

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
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      'input[type="number"]': {
                        textAlign: "center",
                        padding: "0",
                        border: "none",
                        outline: "none",
                        "-moz-appearance": "textfield",
                        appearance: "none",
                        // Additional styling to reduce width and remove spinner
                        width: "auto", // Adjust width here
                        height: "100%",
                        minWidth: "50px", // Optional: minimum width if needed
                      },
                      // Remove increment/decrement buttons
                      inputProps: {
                        style: {
                          // Custom styles
                        },
                        // Disable the spinner
                        'input[type="number"]::-webkit-inner-spin-button': {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                        'input[type="number"]::-webkit-outer-spin-button': {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                        'input[type="number"]::-moz-inner-spin-button': {
                          MozAppearance: "textfield",
                        },
                        'input[type="number"]::-moz-outer-spin-button': {
                          MozAppearance: "textfield",
                        },
                      },
                    },
                  }}
                  inputProps={{ style: { width: "100%", height: "100%" } }}
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
