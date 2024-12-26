import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Toolbar, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#25364C",
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(scoutingScale: string, role: string, war: string) {
  return { scoutingScale, role, war };
}

/***
 * 
20	Org Guy	–
30	Up & Down	< -0.1
40	Backend starters, FIP typically close to 5.00	0.0 to 0.9
45	#4/5 starters, FIP approx 4.20	1.0 to 1.7
50	#4 starters. Approx 4.00 FIP, at times worse but then with lots of innings	1.8 to 2.5
55	#3/4 starters. Approx 3.70 FIP along with about 160 IP	2.6 to 3.4
60	#3 starters, 3.30 FIP, volume approaching 200 innings	3.5 to 4.9
70	#2 starters, FIP under 3, about 200 IP	5.0 to 7.0
80	#1s. Top 1-3 arms in baseball. ‘Ace’ if they do it several years in a row.	>7.0

 */
const rows = [
  createData("20", "Org guy", "-"),
  createData("30", "Up & Down", "<-0.1"),
  createData(
    "40",
    "Backend starters, FIP typically close to 5.00",
    "0.0 to 0.9"
  ),
  createData("45", "#4/5 starters, FIP approx 4.20", "1.0 to 1.7"),
  createData(
    "50",
    "#4 starters. Approx 4.00 FIP, at times worse but then with lots of innings",
    "1.8 to 2.5"
  ),
  createData(
    "55",
    "#3/4 starters. Approx 3.70 FIP along with about 160 IP",
    "2.6 to 3.4"
  ),
  createData(
    "60",
    "#3 starters, 3.30 FIP, volume approaching 200 innings",
    "3.5 to 4.9"
  ),
  createData("70", "#2 starters, FIP under 3, about 200 IP", "5.0 to 7.0"),
  createData(
    "80",
    "#1s. Top 1-3 arms in baseball. ‘Ace’ if they do it several years in a row.",
    "> 7.0"
  ),
];

export default function CustomizedTables() {
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ height: "100%", width: 750, maxWidth: "100vw" }}
      >
        <Toolbar style={{ backgroundColor: "#25364C" }}>
          <Typography
            variant="h6"
            style={{ color: "#FFFFFF", fontWeight: "bold" }}
          >
            Pitcher Future Values (FV) Explained
          </Typography>
        </Toolbar>
        <Table aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Scouting Scale</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>WAR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.scoutingScale}>
                <StyledTableCell component="th" scope="row">
                  {row.scoutingScale}
                </StyledTableCell>
                <StyledTableCell align="left">{row.role}</StyledTableCell>
                <StyledTableCell align="center">{row.war}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
