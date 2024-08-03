import React, { useCallback, useRef } from "react";
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

  const handleChange = useCallback(
    (value: string, rowIndex: number, colIndex: number) => {
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
      display="flex"
      justifyContent="center"
      alignItems="center"
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
        width={Math.min(1000 * cols, 1000)}
        height={Math.min(45 * rows, 400)}
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
                      border: "none",
                      outline: "none",
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
