import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slider, { SliderThumb } from "@mui/material/Slider";
import chroma from "chroma-js";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

export default function PlayerPage(props) {
  const [playerData, setPlayerData] = useState({});
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
      });
  }, [props.id]);

  function ThumbComponent(props) {
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

  ThumbComponent.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number,
  };

  return (
    <div>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Paper
            sx={{
              height: 600,
              width: 300,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          />
        </Grid>
        <Grid item>
          <Paper
            sx={{
              height: 600,
              width: 500,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            {playerData.xwoba_p !== "undefined" &&
              !isNaN(playerData.xwoba_p) && (
                <div>
                  <h2>
                    {playerData.name} ({props.id})
                  </h2>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>xwOBA</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.xwoba_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.xwoba_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.xwoba_p).toString(),
                        "--track": trackscale(playerData.xwoba_p).toString(),
                        "--rail": railscale(playerData.xwoba_p).toString(),
                        "--active": activescale(playerData.xwoba_p).toString(),
                      }}
                    />
                    <p>{playerData.xwoba}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>xBA</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.xba_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.xba_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.xba_p).toString(),
                        "--track": trackscale(playerData.xba_p).toString(),
                        "--rail": railscale(playerData.xba_p).toString(),
                        "--active": activescale(playerData.xba_p).toString(),
                      }}
                    />
                    <p>{playerData.xba}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>xSLG</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.xslg_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.xslg_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.xslg_p).toString(),
                        "--track": trackscale(playerData.xslg_p).toString(),
                        "--rail": railscale(playerData.xslg_p).toString(),
                        "--active": activescale(playerData.xslg_p).toString(),
                      }}
                    />
                    <p>{playerData.xslg}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>ev</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.ev_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.ev_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.ev_p).toString(),
                        "--track": trackscale(playerData.ev_p).toString(),
                        "--rail": railscale(playerData.ev_p).toString(),
                        "--active": activescale(playerData.ev_p).toString(),
                      }}
                    />
                    <p>{playerData.ev}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>barrelbbe</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value:
                            Number(playerData.barrelbbe_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.barrelbbe_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(
                          playerData.barrelbbe_p
                        ).toString(),
                        "--track": trackscale(
                          playerData.barrelbbe_p
                        ).toString(),
                        "--rail": railscale(playerData.barrelbbe_p).toString(),
                        "--active": activescale(
                          playerData.barrelbbe_p
                        ).toString(),
                      }}
                    />
                    <p>{playerData.barrelbbe}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>hhrate</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.hhrate_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.hhrate_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.hhrate_p).toString(),
                        "--track": trackscale(playerData.hhrate_p).toString(),
                        "--rail": railscale(playerData.hhrate_p).toString(),
                        "--active": activescale(playerData.hhrate_p).toString(),
                      }}
                    />
                    <p>{playerData.hhrate}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>chaserate</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value:
                            Number(playerData.chaserate_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.chaserate_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(
                          playerData.chaserate_p
                        ).toString(),
                        "--track": trackscale(
                          playerData.chaserate_p
                        ).toString(),
                        "--rail": railscale(playerData.chaserate_p).toString(),
                        "--active": activescale(
                          playerData.chaserate_p
                        ).toString(),
                      }}
                    />
                    <p>{playerData.chaserate}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>whiffrate</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value:
                            Number(playerData.whiffrate_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.whiffrate_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(
                          playerData.whiffrate_p
                        ).toString(),
                        "--track": trackscale(
                          playerData.whiffrate_p
                        ).toString(),
                        "--rail": railscale(playerData.whiffrate_p).toString(),
                        "--active": activescale(
                          playerData.whiffrate_p
                        ).toString(),
                      }}
                    />
                    <p>{playerData.whiffrate}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>krate</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.krate_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.krate_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.krate_p).toString(),
                        "--track": trackscale(playerData.krate_p).toString(),
                        "--rail": railscale(playerData.krate_p).toString(),
                        "--active": activescale(playerData.krate_p).toString(),
                      }}
                    />
                    <p>{playerData.krate}</p>
                  </Stack>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ alignItems: "center", mb: 1 }}
                  >
                    <p>bbrate</p>
                    <Slider
                      slotProps={{
                        thumb: {
                          value: Number(playerData.bbrate_p).toFixed(2) * 100,
                        },
                      }}
                      slots={{
                        thumb: ThumbComponent,
                      }}
                      value={Number(playerData.bbrate_p).toFixed(2) * 100}
                      step={10}
                      marks
                      min={0}
                      max={100}
                      disabled
                      sx={{
                        "& .MuiSlider-thumb": {
                          backgroundColor: "var(--thumb)",
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "var(--track)",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "var(--rail)",
                        },
                        "& .MuiSlider-active": {
                          backgroundColor: "var(--active)",
                        },
                      }}
                      style={{
                        "--thumb": thumbscale(playerData.bbrate_p).toString(),
                        "--track": trackscale(playerData.bbrate_p).toString(),
                        "--rail": railscale(playerData.bbrate_p).toString(),
                        "--active": activescale(playerData.bbrate_p).toString(),
                      }}
                    />
                    <p>{playerData.bbrate}</p>
                  </Stack>
                </div>
              )}
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            sx={{
              height: 600,
              width: 300,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          />
        </Grid>
      </Grid>
      <div>
        <h2>
          {playerData.name} ({props.id})
        </h2>
        <h3>
          xwOBA Percentile: {Number(playerData.xwoba_p).toFixed(2) * 100} (
          {playerData.xwoba})
        </h3>
        <h3>
          xba Percentile: {Number(playerData.xba_p).toFixed(2) * 100} (
          {playerData.xba})
        </h3>
        <h3>
          xslg Percentile: {Number(playerData.xslg_p).toFixed(2) * 100} (
          {playerData.xslg})
        </h3>
        <h3>
          Avg Exit Velo Percentile: {Number(playerData.ev_p).toFixed(2) * 100} (
          {playerData.ev} mph)
        </h3>
        <h3>
          Barrel % Percentile: {Number(playerData.barrelbbe_p).toFixed(2) * 100}{" "}
          ({playerData.barrelbbe}%)
        </h3>
        <h3>
          Hard Hit % Percentile: {Number(playerData.hhrate_p).toFixed(2) * 100}{" "}
          ({playerData.hhrate}%)
        </h3>
        <h3>
          Chase % Percentile:{" "}
          {100 - Number(playerData.chaserate_p).toFixed(2) * 100} (
          {playerData.chaserate}%)
        </h3>
        <h3>
          Whiff % Percentile:{" "}
          {100 - Number(playerData.whiffrate_p).toFixed(2) * 100} (
          {playerData.whiffrate}%)
        </h3>
        <h3>
          K % Percentile: {100 - Number(playerData.krate_p).toFixed(2) * 100} (
          {playerData.krate}%)
        </h3>
        <h3>
          BB % Percentile: {Number(playerData.bbrate_p).toFixed(2) * 100} (
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
  );
}
