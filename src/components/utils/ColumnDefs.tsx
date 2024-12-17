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

export const hitter_columns: GridColDef<any>[] = [
  { field: "id", headerName: "ID", width: 90 },
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
          <Link href={"/player/" + params.row.id} underline="hover">
            {params.value}
          </Link>
        </Box>
      );
    },
  },
  {
    field: "MLB_AbbName",
    headerName: "Org",
    width: 60,
    valueFormatter: (value: string) => {
      return value !== "0" ? value : "FA";
    },
  },
  { field: "Position", headerName: "Position", width: 60 },
  { field: "age", headerName: "Age", width: 60 },
  { field: "pa", headerName: "PA", width: 60 },
  { field: "ab", headerName: "AB", width: 60 },
  { field: "pitches", headerName: "Pitches", width: 90 },
  { field: "xwoba", headerName: "xWOBA", width: 90 },
  { field: "woba", headerName: "WOBA", width: 90 },
  { field: "pscore", headerName: "Prospect Score", width: 120 },
  {
    field: "score_p",
    headerName: "Prospect Score P%",
    width: 180,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "p_agg",
    headerName: "Aggregate P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "power_agg",
    headerName: "Power Aggregate",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "d_agg",
    headerName: "Discipline",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "xwoba_p",
    headerName: "xWOBA P%",
    width: 90,
    type: "number",
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "xba_p",
    headerName: "xBA P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "xslg_p",
    headerName: "xSLG P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "barrelbbe_p",
    headerName: "Barrels P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "bbrate_p",
    headerName: "BB% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "chaserate_p",
    headerName: "Chase% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "ev_p",
    headerName: "EV P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "hhrate_p",
    headerName: "Hard Hit% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "krate_p",
    headerName: "K% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "langle_p",
    headerName: "L° P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "whiffrate_p",
    headerName: "Whiff% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  { field: "xba", headerName: "xBA", width: 90 },
  { field: "xslg", headerName: "xSLG", width: 90 },
  { field: "barrelbbe", headerName: "Barrels", width: 90 },
  { field: "bbrate", headerName: "BB%", width: 90 },
  { field: "chaserate", headerName: "Chase%", width: 90 },
  { field: "ev", headerName: "EV", width: 90 },
  { field: "hhrate", headerName: "Hard Hit%", width: 90 },
  { field: "krate", headerName: "K%", width: 90 },
  { field: "langle", headerName: "L°", width: 90 },
  { field: "whiffrate", headerName: "Whiff%", width: 90 },
  { field: "ba", headerName: "BA", width: 90 },
  { field: "obp", headerName: "OBP", width: 90 },
  { field: "slg", headerName: "SLG", width: 90 },
  { field: "babip", headerName: "BABIP", width: 90 },
  { field: "barrelpa", headerName: "PA/Barrels", width: 90 },
  { field: "barrels", headerName: "Barrels", width: 90 },
  { field: "bb", headerName: "BB", width: 90 },
  { field: "doubles", headerName: "2B", width: 90 },
  { field: "triples", headerName: "3B", width: 90 },
  { field: "hits", headerName: "Hits", width: 90 },
  { field: "hr", headerName: "HR", width: 90 },
  { field: "k", headerName: "K", width: 90 },
  { field: "swings", headerName: "Swings", width: 90 },
  { field: "whiffs", headerName: "Whiffs", width: 90 },
];

export const pitcher_columns: GridColDef<any>[] = [
  { field: "id", headerName: "ID", width: 90 },
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
          <Link href={"/player/" + params.row.id} underline="hover">
            {params.value}
          </Link>
        </Box>
      );
    },
  },
  {
    field: "MLB_AbbName",
    headerName: "Org",
    width: 60,
    valueFormatter: (value: string) => {
      return value !== "0" ? value : "FA";
    },
  },
  { field: "Position", headerName: "Position", width: 60 },
  { field: "age", headerName: "Age", width: 60 },
  { field: "pa", headerName: "PA", width: 60 },
  { field: "ab", headerName: "AB", width: 60 },
  { field: "pitches", headerName: "Pitches", width: 90 },
  { field: "xwoba", headerName: "xWOBA", width: 90 },
  { field: "woba", headerName: "WOBA", width: 90 },
  {
    field: "kbb_rate",
    headerName: "K-BB%",
    width: 90,
    valueFormatter: (value: number) => {
      return `${value.toFixed(1)}%`;
    },
  },
  { field: "pscore", headerName: "Prospect Score", width: 120 },
  {
    field: "score_p",
    headerName: "Prospect Score P%",
    width: 180,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "p_agg",
    headerName: "Aggregate P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "power_agg",
    headerName: "Contact Quality",
    width: 120,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "d_agg",
    headerName: "Ratios",
    width: 120,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  { field: "velo", headerName: "FB Velo", width: 90 },
  {
    field: "velo_p",
    headerName: "FB Velo P%",
    width: 90,
    type: "number",
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "xwoba_p",
    headerName: "xWOBA P%",
    width: 90,
    type: "number",
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "xba_p",
    headerName: "xBA P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "xslg_p",
    headerName: "xSLG P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "barrelbbe_p",
    headerName: "Barrels P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "bbrate_p",
    headerName: "BB% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "chaserate_p",
    headerName: "Chase% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "ev_p",
    headerName: "EV P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "hhrate_p",
    headerName: "Hard Hit% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "krate_p",
    headerName: "K% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "langle_p",
    headerName: "L° P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  {
    field: "whiffrate_p",
    headerName: "Whiff% P%",
    width: 90,
    cellClassName: (params: GridCellParams<any>) => {
      return "super-app";
    },
    renderCell: (params: GridRenderCellParams) => {
      const color = scale(params.value).toString();

      return (
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "100%",
            textAlign: "center",
          }}
        >
          {(params.value * 100).toFixed(2)}%
        </Box>
      );
    },
  },
  { field: "xba", headerName: "xBA", width: 90 },
  { field: "xslg", headerName: "xSLG", width: 90 },
  { field: "barrelbbe", headerName: "Barrels", width: 90 },
  { field: "bbrate", headerName: "BB%", width: 90 },
  { field: "chaserate", headerName: "Chase%", width: 90 },
  { field: "ev", headerName: "EV", width: 90 },
  { field: "hhrate", headerName: "Hard Hit%", width: 90 },
  { field: "krate", headerName: "K%", width: 90 },
  { field: "langle", headerName: "L°", width: 90 },
  { field: "whiffrate", headerName: "Whiff%", width: 90 },
  { field: "ba", headerName: "BA", width: 90 },
  { field: "obp", headerName: "OBP", width: 90 },
  { field: "slg", headerName: "SLG", width: 90 },
  { field: "babip", headerName: "BABIP", width: 90 },
  { field: "barrelpa", headerName: "PA/Barrels", width: 90 },
  { field: "barrels", headerName: "Barrels", width: 90 },
  { field: "bb", headerName: "BB", width: 90 },
  { field: "doubles", headerName: "2B", width: 90 },
  { field: "triples", headerName: "3B", width: 90 },
  { field: "hits", headerName: "Hits", width: 90 },
  { field: "hr", headerName: "HR", width: 90 },
  { field: "k", headerName: "K", width: 90 },
  { field: "swings", headerName: "Swings", width: 90 },
  { field: "whiffs", headerName: "Whiffs", width: 90 },
];
