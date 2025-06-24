"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "pointer",
  },
}));

export default function AllInvoiceTable() {
  const router = useRouter();
  const [allInvoiceData, setAllInvoiceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/invoices/`);
        setAllInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" border-2 border-black p-10 rounded-md shadow-2xl">
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Invoice Number</StyledTableCell>
              <StyledTableCell align="center">Client Name</StyledTableCell>
              <StyledTableCell align="center">Total Amount</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allInvoiceData.map((item, index) => (
              <StyledTableRow
                key={index}
                // onClick={() => router.push(`/invoice/${item.id}`)}
                onClick={() => window.open(`/invoice/${item.id}`, "_blank")}
                component={Box}
              >
                <StyledTableCell align="center">{item.number}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.total_amount}
                </StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
