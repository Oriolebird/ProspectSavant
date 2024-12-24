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
Scouting Scale	Role	WAR
20	Org guy	—
30	Up & Down	<-0.1
40	Bench Player	0.0 to 0.7
45	Low End Reg/Platoon	0.8 to 1.5
50	Avg Everyday Player	1.6 to 2.4
55	Above Avg Reg	2.5 to 3.3
60	All Star	3.4 to 4.9
70	Top 10 overall	5.0 to 7.0
80	Top 5 overall	> 7.0

 */
const rows = [
  createData("20", "Org guy", "-"),
  createData("30", "Up & Down", "<-0.1"),
  createData("40", "Bench Player", "0.0 to 0.7"),
  createData("45", "Low End Reg/Platoon", "0.8 to 1.5"),
  createData("50", "Avg Everyday Player", "1.6 to 2.4"),
  createData("55", "Above Avg Reg", "2.5 to 3.3"),
  createData("60", "All Star", "3.4 to 4.9"),
  createData("70", "Top 10 Overall", "5.0 to 7.0"),
  createData("80", "Top 5 Overall", "> 7.0"),
];

export default function CustomizedTables() {
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ height: 400, maxWidth: "75vw", width: 410 }}
      >
        <Toolbar style={{ backgroundColor: "#25364C" }}>
          <Typography
            variant="h6"
            style={{ color: "#FFFFFF", fontWeight: "bold" }}
          >
            Hitter Future Values (FV) Explained
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
