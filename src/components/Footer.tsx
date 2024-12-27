import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import SIS from "./SIS.png";
import MLB from "./MLB.png";
import Fangraphs from "./fangraphs.png";

export default function Footer() {
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        spacing={0}
        alignContent="center"
        sx={{
          maxWidth: "100vw",
          width: "100%",
          border: "#293241 solid 1px",
          padding: "10px",
          backgroundColor: "#25364c",
        }}
      >
        <Typography
          variant="h5"
          style={{ color: "#FFFFFF", marginTop: "10px" }}
        >
          Email all recommendations, requests, bugs, and love letters to
          duke@prospectsavant.com
        </Typography>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          maxWidth="100%"
          alignContent="center"
          sx={{
            maxWidth: "100vw",
            width: "100%",
            border: "#293241 solid 1px",
            backgroundColor: "#25364c",
          }}
        >
          <Grid
            container
            justifyContent="center"
            spacing={0}
            maxWidth="80%"
            alignContent="center"
            width="400px"
            height="200px"
          >
            <a href="https://www.sportsinfosolutions.com/">
              <img
                src={SIS}
                height="128px"
                alt=""
                style={{ marginLeft: "10px", marginTop: "10px" }}
              />
            </a>
            <Typography
              style={{ color: "#FFFFFF", textAlign: "center" }}
              variant="body2"
            >
              All major league baseball data including pitch type, velocity,
              batted ball location, and play-by-play data provided by Sports
              Info Solutions.
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={0}
            maxWidth="80%"
            alignContent="center"
            width="400px"
            height="200px"
            paddingTop="10px"
          >
            <a href="https://www.mlb.com/">
              <img
                src={MLB}
                height="80px"
                alt=""
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              />
            </a>

            <Typography
              style={{ color: "#FFFFFF", textAlign: "center" }}
              variant="body2"
            >
              Major League and Minor League Baseball data provided by Major
              League Baseball.
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={0}
            maxWidth="80%"
            alignContent="center"
            width="400px"
            height="200px"
            paddingTop="10px"
          >
            <a href="https://www.fangraphs.com/">
              <img
                src={Fangraphs}
                height="80px"
                alt=""
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  marginBottom: "20px",
                  boxShadow: "1px 1px 1px white",
                  border: "5px solid white"
                }}
              />
            </a>

            <Typography
              style={{ color: "#FFFFFF", textAlign: "center" }}
              variant="body2"
            >
              Prospect Future Values and Summaries/Writeups provided by
              FanGraphs API.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
