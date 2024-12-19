import Slider, { SliderThumb } from "@mui/material/Slider";
import chroma from "chroma-js";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export default function PlayerPage({
  stat,
  value,
  percentile,
  percentile_raw,
}: {
  stat: string;
  value: number;
  percentile: number;
  percentile_raw: number;
}) {
  const thumbscale = chroma.scale(["#3661AD", "#C2C2C2", "#D82129"]);
  const trackscale = chroma.scale(["#3661AD", "#C2C2C2", "#D82129"]);
  const activescale = chroma.scale(["#3661AD", "#C2C2C2", "#D82129"]);

  function ThumbComponent(props: ThumbComponentProps) {
    const { children, ...other } = props;
    return (
      <div>
        <SliderThumb {...other}>
          {children}
          <p
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2vh",
            }}
          >
            {Math.round(props.value)}
          </p>
        </SliderThumb>
      </div>
    );
  }

  interface ThumbComponentProps extends React.HTMLAttributes<unknown> {
    value: number;
  }

  return (
    <div>
      <Grid
        container
        spacing={1}
        columns={16}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid size={3}>
          <Typography variant="body2" textAlign="right">
            {stat}
          </Typography>
        </Grid>
        <Grid size={10}>
          <Slider
            slotProps={{
              thumb: {
                value: percentile,
              } as ThumbComponentProps,
            }}
            slots={{
              thumb: ThumbComponent,
            }}
            value={percentile}
            step={10}
            marks
            min={0}
            max={100}
            disabled
            sx={{
              "& .MuiSlider-thumb": {
                backgroundColor: "var(--thumb)",
                outline: "2px solid white",
              },
              "& .MuiSlider-track": {
                backgroundColor: "var(--track)",
                height: 18,
                borderRadius: 0,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "var(--rail)",
                height: 6,
                borderRadius: 0,
              },
              "& .MuiSlider-active": {
                backgroundColor: "var(--active)",
                borderRadius: 0,
              },
            }}
            style={
              {
                "--thumb": thumbscale(percentile_raw).toString(),
                "--track": trackscale(percentile_raw).toString(),
                "--rail": "#C7DCDC",
                "--active": activescale(percentile_raw).toString(),
              } as React.CSSProperties
            }
          />
        </Grid>
        <Grid size={3}>
          <Typography variant="body2" textAlign="right" marginRight="40px">
            {value}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
