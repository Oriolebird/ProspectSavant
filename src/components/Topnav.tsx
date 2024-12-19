import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, Grid, Tab } from "@mui/material";
import logo from "./logo.png";
import logo2 from "./logo2.png";


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export default function TopNav({
  setSearchText,
  search,
  searchText,
  isDesktop
}: {
  setSearchText: Function;
  search: Function;
  searchText: string;
  isDesktop: boolean;
}) {
  return (
    <div>{isDesktop &&
      <Box sx={{ flexGrow: 1, marginBottom: "25px" }}>
        <AppBar position="static" sx={{ backgroundColor: "#3D5A80" }}>
          <Toolbar>
            <img src={logo} width="600vw" alt="" style={{ maxWidth: "100%" }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >

            </Typography>
            <Tab label="Leaderboard" {...a11yProps(0)} href="/leaders" />

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                inputProps={{ "aria-label": "search" }}
                placeholder="Search For a Player"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") {
                    search();
                    ev.preventDefault();
                  }
                }}
              />
            </Search>
            <img src={logo2} height="64px" alt="" style={{ marginLeft: "20px" }} />
          </Toolbar>
        </AppBar>
      </Box>}
      {!isDesktop &&
        <Box sx={{ flexGrow: 1, marginBottom: "25px" }}>
          <AppBar position="static" sx={{ backgroundColor: "#3D5A80" }}>
            <Toolbar style={{ display: "flex", flexDirection: "column" }}>
              <img src={logo} width="600vw" alt="" style={{ maxWidth: "100%" }} />
              <Grid
                container
                spacing={1}
                columns={16}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                marginTop="0px" 
              >
                <Tab label="Leaderboard" {...a11yProps(0)} href="/leaders" />
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    inputProps={{ "aria-label": "search" }}
                    placeholder="Search For a Player"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") {
                        search();
                        ev.preventDefault();
                      }
                    }}
                  />
                </Search>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      }
    </div>
  );
}
