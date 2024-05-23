/* eslint-disable @typescript-eslint/no-explicit-any */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US");
};

interface ColumnConfig {
  id: string;
  label: string;
  align?: "right" | "left" | "center" | "inherit" | "justify";
  format?: (value: any) => string;
  dataType?: "string" | "number" | "date" | "boolean";
}

interface CustomTableProps {
  data: any[];
  columns: ColumnConfig[];
  title?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({ data, columns, title }) => {
  if (!data.length) {
    return null;
  }

  const renderCell = (item: any, column: ColumnConfig) => {
    const rawValue = item[column.id] ?? "-";
    if (column.format) {
      return column.format(rawValue);
    }
    if (column.dataType === "date") {
      return formatDate(rawValue);
    }
    if (column.dataType === "boolean") {
      return rawValue ? <CheckBoxIcon color="success" /> : <CancelIcon color="error" />;
    }
    return rawValue;
  };

  return (
    <Container
      style={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Typography variant="h6" component="div" gutterBottom>
          {title || "Dynamic Data Table"}
        </Typography>
        <TableContainer
          component={Paper}
          style={{
            maxHeight: 610,
          }}
        >
          <Table sx={{ minWidth: 550 }} aria-label="custom table" stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "right"}
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "#fff",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${column.id}-${index}`}
                      align={column.align || "right"}
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      {renderCell(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default CustomTable;
