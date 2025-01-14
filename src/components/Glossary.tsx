import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import FVTableHitters from "./FVTableHitters";
import FVTablePitchers from "./FVTablePitchers";

export default function Glossary({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div>
      {isDesktop && (
        <Grid container justifyContent="center" spacing={2} maxWidth="100%">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {false && <FVTableHitters />}
            {false && <FVTablePitchers />}
          </Grid>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">PS Score</Typography>
            <Typography variant="body2">
              PS (Prospect Savant) Score is a percentile stat that tries to
              evaluate prospect value. It weighs results, batted ball stats, and
              discipline (for hitters) multiplied by their age percentile
              (younger is better).
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">P%</Typography>
            <Typography variant="body2">
              Stats labeled with 'P%' are percentile stats. The value signifies
              what percent of players are below this player in this stat.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">
              Expected Weighted On-base Average (xwOBA)
            </Typography>
            <Typography variant="body2">
              xwOBA is formulated using exit velocity, launch angle and, on
              certain types of batted balls, Sprint Speed.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Agg</Typography>
            <Typography variant="body2">
              Agg is simply an aggregate of all the player's percentiles.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Contact Quality</Typography>
            <Typography variant="body2">
              The 'Contact Quality' stat is simply an aggregate of the pitcher's
              expected slugging against, exit velocity against, hard hit rate,
              and barrel rate, all as a percentile stat.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Power</Typography>
            <Typography variant="body2">
              The 'Power' stat is simply an aggregate of the hitter's expected
              slugging, exit velocity, hard hit rate, and barrel rate, all as a
              percentile stat.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Discipline</Typography>
            <Typography variant="body2">
              The 'Discipline' stat is simply an aggregate of a player's chase
              rate, whiff rate, walk rate, and strikeout rate.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Expected Batting Average (xBA)</Typography>
            <Typography variant="body2">
              xBA measures the likelihood that a batted ball will become a hit.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Exit Velocity (EV)</Typography>
            <Typography variant="body2">
              How fast, in miles per hour, a ball was hit by a batter.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Barrels</Typography>
            <Typography variant="body2">
              A batted ball with the perfect combination of exit velocity and
              launch angle.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "75vw",
              width: 250,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "10px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Hard Hit</Typography>
            <Typography variant="body2">
              Statcast defines a 'hard-hit ball' as one hit with an exit
              velocity of 95 mph or higher.
            </Typography>
          </Paper>
        </Grid>
      )}
      {!isDesktop && (
        <Grid container justifyContent="center" spacing={1} maxWidth="100%">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {false && <FVTableHitters />}
            { false && <FVTablePitchers />}
          </Grid>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">PS Score</Typography>
            <Typography variant="body2">
              PS (Prospect Savant) Score is a percentile stat that tries to
              evaluate prospect value. It weighs results, batted ball stats, and
              discipline (for hitters) multiplied by their age percentile
              (younger is better).
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">P%</Typography>
            <Typography variant="body2">
              Stats labeled with 'P%' are percentile stats. The value signifies
              what percent of players are below this player in this stat.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">
              Expected Weighted On-base Average (xwOBA)
            </Typography>
            <Typography variant="body2">
              xwOBA is formulated using exit velocity, launch angle and, on
              certain types of batted balls, Sprint Speed.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Agg</Typography>
            <Typography variant="body2">
              Agg is simply an aggregate of all the player's percentiles.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Contact Quality</Typography>
            <Typography variant="body2">
              The 'Contact Quality' stat is simply an aggregate of the pitcher's
              expected slugging against, exit velocity against, hard hit rate,
              and barrel rate, all as a percentile stat.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Power</Typography>
            <Typography variant="body2">
              The 'Power' stat is simply an aggregate of the hitter's expected
              slugging, exit velocity, hard hit rate, and barrel rate, all as a
              percentile stat.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Discipline</Typography>
            <Typography variant="body2">
              The 'Discipline' stat is simply an aggregate of a player's chase
              rate, whiff rate, walk rate, and strikeout rate.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Expected Batting Average (xBA)</Typography>
            <Typography variant="body2">
              xBA measures the likelihood that a batted ball will become a hit.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Exit Velocity (EV)</Typography>
            <Typography variant="body2">
              How fast, in miles per hour, a ball was hit by a batter.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Barrels</Typography>
            <Typography variant="body2">
              A batted ball with the perfect combination of exit velocity and
              launch angle.
            </Typography>
          </Paper>
          <Paper
            sx={{
              height: "250",
              maxWidth: "90vw",
              width: 400,
              border: "#293241 solid 1px",
              padding: "10px",
              margin: "2px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
            square
            variant="outlined"
          >
            <Typography variant="h6">Hard Hit</Typography>
            <Typography variant="body2">
              Statcast defines a 'hard-hit ball' as one hit with an exit
              velocity of 95 mph or higher.
            </Typography>
          </Paper>
        </Grid>
      )}
    </div>
  );
}
