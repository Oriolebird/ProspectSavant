import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import {
  GridColDef,
  GridCellParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import chroma from "chroma-js";
import React from "react";

const scale = chroma.scale([
  "rgba(0,0,255,0.5)",
  "#C2C2C2",
  "rgba(255,0,0,0.5)",
]);

export const pitcher_columns: GridColDef<any>[] = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Link href={"/friar-zone/player/" + params.row.name.replace(" ", "-")} underline="hover">
            {params.value}
          </Link>
        </Box>
      );
    },
  },
  { field: "pitch_type", headerName: "Pitch Type", width: 90 },
  { field: "count", headerName: "Pitches", width: 70 },
  { field: "swing_count", headerName: "Swings", width: 70 },
  { field: "contact_count", headerName: "Contact", width: 70 },
  { field: "hit_count", headerName: "Hits", width: 50 },
  {
    field: "usage",
    headerName: "Usage",
    width: 70,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(2)+"%";
    },
  },
  {
    field: "spin_rate",
    headerName: "Spin Rate",
    width: 90,
    valueFormatter: (value: number) => {
      return value.toFixed(0);
    },
  },
  {
    field: "rel_speed",
    headerName: "Velo",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(1);
    },
  },
  {
    field: "max_velo",
    headerName: "Max Velo",
    width: 80,
    valueFormatter: (value: number) => {
      return value.toFixed(1);
    },
  },
  {
    field: "velo_diff",
    headerName: "Diff",
    width: 80,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "horz_break",
    headerName: "H Break",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "vert_break",
    headerName: "V Break",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "iv_break",
    headerName: "IV Break",
    width: 80,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "whiffrate",
    headerName: "Whiff%",
    width: 70,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(2)+"%";
    },
  },
  {
    field: "chase_rate",
    headerName: "Chase%",
    width: 70,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(2)+"%";
    },
  },
  {
    field: "BABIP",
    headerName: "BABIP",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "inplay_ev",
    headerName: "EV",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "la",
    headerName: "L°",
    width: 60,
    valueFormatter: (value: number) => {
      return value.toFixed(1);
    },
  },
  {
    field: "rel_angle",
    headerName: "R Angle",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "rel_direction",
    headerName: "R Direction",
    width: 90,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "rel_side",
    headerName: "R Side",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "rel_height",
    headerName: "R Height",
    width: 80,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "gbrate",
    headerName: "GB%",
    width: 78,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(1)+"%";
    },
  },
  {
    field: "ldrate",
    headerName: "LD%",
    width: 78,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(1)+"%";
    },
  },
  {
    field: "fbrate",
    headerName: "FB%",
    width: 78,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(1)+"%";
    },
  },
];

export const batter_columns: GridColDef<any>[] = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Link href={"/friar-zone/player/" + params.row.name.replace(" ", "-")} underline="hover">
            {params.value}
          </Link>
        </Box>
      );
    },
  },
  { field: "pitch_type", headerName: "Pitch Type", width: 90 },
  { field: "count", headerName: "Pitches", width: 70 },
  { field: "swing_count", headerName: "Swings", width: 70 },
  { field: "contact_count", headerName: "Contact", width: 70 },
  { field: "hit_count", headerName: "Hits", width: 50 },
  {
    field: "usage",
    headerName: "Usage",
    width: 70,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(2)+"%";
    },
  },
  {
    field: "whiffrate",
    headerName: "Whiff%",
    width: 70,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(2)+"%";
    },
  },
  {
    field: "chase_rate",
    headerName: "Chase%",
    width: 70,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(2)+"%";
    },
  },
  {
    field: "BABIP",
    headerName: "BABIP",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "inplay_ev",
    headerName: "EV",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(2);
    },
  },
  {
    field: "bat_speed",
    headerName: "Bat Speed",
    width: 90,
    valueFormatter: (value: number) => {
      return value.toFixed(1);
    },
  },
  {
    field: "la",
    headerName: "L°",
    width: 60,
    valueFormatter: (value: number) => {
      return value.toFixed(1);
    },
  },
  {
    field: "gbrate",
    headerName: "GB%",
    width: 78,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(1)+"%";
    },
  },
  {
    field: "ldrate",
    headerName: "LD%",
    width: 78,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(1)+"%";
    },
  },
  {
    field: "fbrate",
    headerName: "FB%",
    width: 78,
    valueFormatter: (value: number) => {
      return (value*100).toFixed(1)+"%";
    },
  },
];