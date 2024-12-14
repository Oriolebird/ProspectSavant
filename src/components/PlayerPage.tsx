import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slider, { SliderThumb } from "@mui/material/Slider";
import chroma from "chroma-js";
import React from "react";
import PlayerCardRow from "./PlayerCardRow";
import { Divider, Typography } from "@mui/material";
import InfoCard from "./InfoCard";

export default function PlayerPage(props: any) {
  const [playerData, setPlayerData] = useState<any>({});
  const hitterFields = [
    "xwoba_p",
    "xba_p",
    "xslg_p",
    "xobp_p",
    "ev_p",
    "barrelbbe_p",
    "hhrate_p",
    "langle_p",
    "chaserate_p",
    "whiffrate_p",
    "krate_p",
    "bbrate_p",
  ];

  const thumbscale = chroma.scale(["blue", "#C2C2C2", "red"]);
  const trackscale = chroma.scale(["blue", "#C2C2C2", "red"]);
  const railscale = chroma.scale(["blue", "#C2C2C2", "red"]);
  const activescale = chroma.scale(["blue", "#C2C2C2", "red"]);

  useEffect(() => {
    fetch("/player/" + props.id)
      .then((res) => res.json())
      .then((data) => {
        setPlayerData(data);
        console.log(data);
      });
  }, [props.id]);

  function ThumbComponent(props: ThumbComponentProps) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <p
          style={{
            color: "white",
            fontFamily: "Roboto Condensed",
            fontWeight: "bold",
            fontSize: "1.5vh",
          }}
        >
          {props.value}
        </p>
      </SliderThumb>
    );
  }

  interface ThumbComponentProps extends React.HTMLAttributes<unknown> {
    value: number;
  }

  return (
    <div>
      {playerData !== undefined && playerData !== null && (
        <div>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Paper
                sx={{
                  height: 500,
                  width: 500,
                  border: "#293241 solid 1px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                square
                variant="outlined"
              >
                {playerData.player_info && (
                  <InfoCard playerUrlProp={playerData.UPURL} />
                )}
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  height: 500,
                  width: 500,
                  border: "#293241 solid 1px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                square
                variant="outlined"
              >
                {playerData.xwoba_p !== "undefined" &&
                  !isNaN(playerData.xwoba_p) && (
                    <div>
                      <Typography variant="h4">
                        {playerData.name} (AAA) ({props.id})
                      </Typography>
                      <PlayerCardRow
                        stat="xWOBA"
                        value={playerData.xwoba}
                        percentile={playerData.xwoba_p.toFixed(2) * 100}
                        percentile_raw={playerData.xwoba_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="xBA"
                        value={playerData.xba}
                        percentile={playerData.xba_p.toFixed(2) * 100}
                        percentile_raw={playerData.xba_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="xSLG"
                        value={playerData.xslg}
                        percentile={playerData.xslg_p.toFixed(2) * 100}
                        percentile_raw={playerData.xslg_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="EV"
                        value={playerData.ev}
                        percentile={playerData.ev_p.toFixed(2) * 100}
                        percentile_raw={playerData.ev_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="Barrel %"
                        value={playerData.barrelbbe}
                        percentile={playerData.barrelbbe_p.toFixed(2) * 100}
                        percentile_raw={playerData.barrelbbe_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="Hard-Hit%"
                        value={playerData.xba}
                        percentile={playerData.xba_p.toFixed(2) * 100}
                        percentile_raw={playerData.xba_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="Chase %"
                        value={playerData.chaserate}
                        percentile={playerData.chaserate_p.toFixed(2) * 100}
                        percentile_raw={playerData.chaserate_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="Whiff %"
                        value={playerData.whiffrate}
                        percentile={playerData.whiffrate_p.toFixed(2) * 100}
                        percentile_raw={playerData.whiffrate_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="K %"
                        value={playerData.krate}
                        percentile={playerData.krate_p.toFixed(2) * 100}
                        percentile_raw={playerData.krate_p}
                      />
                      <Divider variant="middle" />
                      <PlayerCardRow
                        stat="BB %"
                        value={playerData.bbrate}
                        percentile={playerData.bbrate_p.toFixed(2) * 100}
                        percentile_raw={playerData.bbrate_p}
                      />
                    </div>
                  )}
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  height: 500,
                  width: 500,
                  border: "#293241 solid 1px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                square
                variant="outlined"
              />
            </Grid>
          </Grid>
          <div>
            <h2>
              {playerData.name} ({props.id})
            </h2>
            <h3>
              xwOBA Percentile:{" "}
              {playerData.xwoba_p ? playerData.xwoba_p.toFixed(2) * 100 : 0} (
              {playerData.xwoba})
            </h3>
            <h3>
              xba Percentile:{" "}
              {playerData.xba_p ? playerData.xba_p.toFixed(2) * 100 : 0} (
              {playerData.xba})
            </h3>
            <h3>
              xslg Percentile:{" "}
              {playerData.xslg_p ? playerData.xslg_p.toFixed(2) * 100 : 0} (
              {playerData.xslg})
            </h3>
            <h3>
              Avg Exit Velo Percentile:{" "}
              {playerData.ev_p ? playerData.ev_p.toFixed(2) * 100 : 0} (
              {playerData.ev} mph)
            </h3>
            <h3>
              Barrel % Percentile:{" "}
              {playerData.barrelbbe_p
                ? playerData.barrelbbe_p.toFixed(2) * 100
                : 0}{" "}
              ({playerData.barrelbbe}%)
            </h3>
            <h3>
              Hard Hit % Percentile:{" "}
              {playerData.hhrate_p ? playerData.hhrate_p.toFixed(2) * 100 : 0} (
              {playerData.hhrate}%)
            </h3>
            <h3>
              Chase % Percentile:{" "}
              {playerData.chaserate_p
                ? 100 - playerData.chaserate_p.toFixed(2) * 100
                : 0}{" "}
              ({playerData.chaserate}%)
            </h3>
            <h3>
              Whiff % Percentile:{" "}
              {playerData.whiffrate_p
                ? 100 - playerData.whiffrate_p.toFixed(2) * 100
                : 0}{" "}
              ({playerData.whiffrate}%)
            </h3>
            <h3>
              K % Percentile:{" "}
              {playerData.krate_p
                ? 100 - playerData.krate_p.toFixed(2) * 100
                : 0}{" "}
              ({playerData.krate}%)
            </h3>
            <h3>
              BB % Percentile:{" "}
              {playerData.bbrate_p ? playerData.bbrate_p.toFixed(2) * 100 : 0} (
              {playerData.bbrate}%)
            </h3>
            <div>
              {Object.keys(playerData).map((key, index) => (
                <p key={index}>
                  {key} : {playerData[key]}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
