import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Tab } from "@mui/material";
import logo from "./logo.png";
import logo2 from "./logo2.png";
import { a11yProps } from "./utils/TabExtras";

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

export default function FriarTopNav({
  setSearchText,
  search,
  searchText,
  isDesktop,
  matches,
}: {
  setSearchText: Function;
  search: Function;
  searchText: string;
  isDesktop: boolean;
  matches: any;
}) {
  //const [open, setOpen] = useState(true);
  const open = true;
  return (
    <div>
      {isDesktop && (
        <Box
          sx={{
            flexGrow: 1,
            marginBottom: "10px",
          }}
        >
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#3C302C",
              overflow: "visible",
              height: "68px",
              maxHeight: "68px",
              boxShadow: "0px 1px 1px black, 0px 3px 3px black"
            }}
          >
            <Toolbar>
              <img
                src={logo}
                width="400vw"
                alt=""
                style={{ maxWidth: "100%" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              ></Typography>
              <Tab label="ProspectSavant" {...a11yProps(1)} href="/leaders" />
              <Tab label="Leaderboard" {...a11yProps(0)} href="/friar-zone" />
              <Grid
                container
                spacing={0}
                columns={1}
                direction="column"
                style={{
                  overflow: "visible",
                  height: "100%",
                  width: "400px",
                  position: "relative",
                }}
              >
                <Search
                  id="search"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  style={{ marginTop: "15px" }}
                >
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
                {searchText.length > 0 && (
                  <Grid
                    container
                    spacing={0}
                    columns={1}
                    direction="column"
                    style={{
                      position: "absolute",
                      bottom: "-150px",
                      overflow: "visible",
                      backgroundColor: "#FFFFFF",
                      height: 150,
                      border: "#293241 solid 1px",
                      zIndex: 2
                    }}
                  >
                    {matches.map((player: any, index: number) => {
                      return (
                        <a href={"/friar-zone/player/" + player.name.replace(" ", "-")} style={{ zIndex: 2 }}>
                          <Grid
                            container
                            spacing={1}
                            columns={16}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{
                              position: "absolute",
                              top: 10 + index * 30,
                              height: 30,
                            }}
                            key={index}
                          >
                            <Typography
                              variant="subtitle2"
                              textAlign="right"
                              marginRight="30px"
                              style={{ color: "#000000" }}
                            >
                              {player.name}
                            </Typography>
                          </Grid>
                        </a>
                      );
                    })}
                  </Grid>
                )}
              </Grid>
              <img
                src={logo2}
                height="64px"
                alt=""
                style={{ marginLeft: "20px" }}
              />
            </Toolbar>
          </AppBar>
        </Box>
      )}
      {!isDesktop && (
        <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
          <AppBar position="static" sx={{ backgroundColor: "#3C302C", boxShadow: "0px 2px 1px black" }}>
            <Toolbar style={{ display: "flex", flexDirection: "column" }}>
              
              <Grid
                container
                spacing={1}
                columns={16}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                marginTop="0px"
              >
                <img
                src={logo}
                width="100%"
                alt=""
                style={{ maxWidth: "100%", boxShadow: "0px 2px 0px black", marginTop: "10px", borderTop: "2px solid black"   }}
              />
                <Tab label="ProspectSavant" {...a11yProps(1)} href="/leaders" />
                <Tab label="Leaderboard" {...a11yProps(0)} href="/friar-zone" />
                <Grid container spacing={0} columns={1} direction="column" style={{marginBottom: "10px"}}>
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
                  {searchText.length > 0 && (
                    <Grid
                      container
                      spacing={0}
                      columns={1}
                      direction="column"
                      style={{
                        position: "absolute",
                        bottom: "-150px",
                        overflow: "visible",
                        backgroundColor: "#FFFFFF",
                        height: 150,
                        border: "#293241 solid 1px",
                        zIndex: 2,
                        width: "90vw",
                      }}
                    >
                      {matches.map((player: any, index: number) => {
                      return (
                        <a href={"/friar-zone/player/" + player.name.replace(" ", "-")} style={{ zIndex: 2 }}>
                          <Grid
                            container
                            spacing={1}
                            columns={16}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{
                              position: "absolute",
                              top: 10 + index * 30,
                              height: 30,
                            }}
                            key={index}
                          >
                            <Typography
                              variant="subtitle2"
                              textAlign="right"
                              marginRight="30px"
                              style={{ color: "#000000" }}
                            >
                              {player.name}
                            </Typography>
                          </Grid>
                        </a>
                      );
                    })}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
}
