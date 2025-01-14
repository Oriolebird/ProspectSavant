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
    valueGetter: (value: any) => {
      return value !== "0" && value !== 0 ? value.toString() : "FA";
    },
    valueFormatter: (value: any) => {
      return value !== "0" && value !== 0 ? value : "FA";
    },
  },
  { field: "Position", headerName: "Pos", width: 80 },
  { field: "age", headerName: "Age", width: 60 },
  { field: "pa", headerName: "PA", width: 60 },
  { field: "ab", headerName: "AB", width: 60 },
  { field: "pitches", headerName: "Pitches", width: 70 },
  {
    field: "xwoba",
    headerName: "xWOBA",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "woba",
    headerName: "WOBA",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "score_p",
    headerName: "PS Score",
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
    field: "p_agg",
    headerName: "Agg",
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
    headerName: "Power",
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
  {
    field: "spd_p",
    headerName: "Speed P%",
    width: 100,
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
    field: "wbsr_pa_p",
    headerName: "wBsR/PA P%",
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
    field: "pull_p",
    headerName: "Pull P%",
    width: 100,
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
  { field: "spd", headerName: "Spd", width: 90 },
  { field: "wbsr", headerName: "wBsR", width: 90 },
  { field: "wbsr_pa", headerName: "wBsR/PA", width: 90 },
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
    valueGetter: (value: any) => {
      return value !== "0" && value !== 0 ? value.toString() : "FA";
    },
    valueFormatter: (value: any) => {
      return value !== "0" && value !== 0 ? value : "FA";
    },
  },
  { field: "Position", headerName: "Pos", width: 60 },
  { field: "age", headerName: "Age", width: 60 },
  { field: "pa", headerName: "PA", width: 60 },
  { field: "ab", headerName: "AB", width: 60 },
  { field: "pitches", headerName: "Pitches", width: 70 },
  {
    field: "xwoba",
    headerName: "xWOBA",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "woba",
    headerName: "WOBA",
    width: 70,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "score_p",
    headerName: "PS Score",
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
    field: "p_agg",
    headerName: "Agg",
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
  { field: "velo", headerName: "FB Velo", width: 70 },
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

export const hitter_columns_mobile: GridColDef<any>[] = [
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
    width: 100,
    valueGetter: (value: any) => {
      return value !== "0" && value !== 0 ? value.toString() : "FA";
    },
    valueFormatter: (value: any) => {
      return value !== "0" && value !== 0 ? value : "FA";
    },
  },
  { field: "Position", headerName: "Pos", width: 100 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "pa", headerName: "PA", width: 100 },
  { field: "ab", headerName: "AB", width: 100 },
  { field: "pitches", headerName: "Pitches", width: 120 },
  {
    field: "xwoba",
    headerName: "xWOBA",
    width: 125,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "woba",
    headerName: "WOBA",
    width: 120,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "score_p",
    headerName: "PS Score",
    width: 140,
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
    headerName: "Agg",
    width: 100,
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
    headerName: "Power",
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
    headerName: "Discipline",
    width: 140,
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
    width: 150,
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
    width: 140,
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
    width: 140,
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
    width: 150,
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
    width: 140,
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
    width: 160,
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
    width: 140,
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
    width: 170,
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
    width: 130,
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
    field: "whiffrate_p",
    headerName: "Whiff% P%",
    width: 145,
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
    field: "spd_p",
    headerName: "Speed P%",
    width: 145,
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
    field: "wbsr_pa_p",
    headerName: "wBsR/PA P%",
    width: 145,
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
    field: "pull_p",
    headerName: "Pull P%",
    width: 145,
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
  { field: "spd", headerName: "Spd", width: 90 },
  { field: "wbsr", headerName: "wBsR", width: 90 },
  { field: "wbsr_pa", headerName: "wBsR/PA", width: 90 },
  { field: "xba", headerName: "xBA", width: 100 },
  { field: "xslg", headerName: "xSLG", width: 110 },
  { field: "barrelbbe", headerName: "Barrels", width: 120 },
  { field: "bbrate", headerName: "BB%", width: 110 },
  { field: "chaserate", headerName: "Chase%", width: 130 },
  { field: "ev", headerName: "EV", width: 100 },
  { field: "hhrate", headerName: "Hard Hit%", width: 140 },
  { field: "krate", headerName: "K%", width: 100 },
  { field: "langle", headerName: "L°", width: 100 },
  { field: "whiffrate", headerName: "Whiff%", width: 120 },
  { field: "ba", headerName: "BA", width: 100 },
  { field: "obp", headerName: "OBP", width: 105 },
  { field: "slg", headerName: "SLG", width: 105 },
  { field: "babip", headerName: "BABIP", width: 115 },
  { field: "barrelpa", headerName: "PA/Barrels", width: 145 },
  { field: "barrels", headerName: "Barrels", width: 120 },
  { field: "bb", headerName: "BB", width: 100 },
  { field: "doubles", headerName: "2B", width: 100 },
  { field: "triples", headerName: "3B", width: 100 },
  { field: "hits", headerName: "Hits", width: 110 },
  { field: "hr", headerName: "HR", width: 100 },
  { field: "k", headerName: "K", width: 90 },
  { field: "swings", headerName: "Swings", width: 120 },
  { field: "whiffs", headerName: "Whiffs", width: 120 },
];

export const pitcher_columns_mobile: GridColDef<any>[] = [
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
    width: 100,
    valueGetter: (value: any) => {
      return value !== "0" && value !== 0 ? value.toString() : "FA";
    },
    valueFormatter: (value: any) => {
      return value !== "0" && value !== 0 ? value : "FA";
    },
  },
  { field: "Position", headerName: "Pos", width: 100 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "pa", headerName: "PA", width: 100 },
  { field: "ab", headerName: "AB", width: 100 },
  { field: "pitches", headerName: "Pitches", width: 120 },
  {
    field: "xwoba",
    headerName: "xWOBA",
    width: 125,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "woba",
    headerName: "WOBA",
    width: 120,
    valueFormatter: (value: number) => {
      return value.toFixed(3);
    },
  },
  {
    field: "score_p",
    headerName: "PS Score",
    width: 140,
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
    headerName: "Agg",
    width: 100,
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
    width: 175,
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
  { field: "velo", headerName: "FB Velo", width: 125 },
  {
    field: "velo_p",
    headerName: "FB Velo P%",
    width: 150,
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
    width: 150,
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
    width: 140,
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
    width: 140,
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
    width: 145,
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
    width: 135,
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
    width: 160,
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
    field: "hhrate_p",
    headerName: "Hard Hit% P%",
    width: 165,
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
    width: 125,
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
    width: 125,
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
    width: 145,
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
  { field: "xba", headerName: "xBA", width: 100 },
  { field: "xslg", headerName: "xSLG", width: 110 },
  { field: "barrelbbe", headerName: "Barrels", width: 120 },
  { field: "bbrate", headerName: "BB%", width: 110 },
  { field: "chaserate", headerName: "Chase%", width: 130 },
  { field: "ev", headerName: "EV", width: 100 },
  { field: "hhrate", headerName: "Hard Hit%", width: 140 },
  { field: "krate", headerName: "K%", width: 100 },
  { field: "langle", headerName: "L°", width: 100 },
  { field: "whiffrate", headerName: "Whiff%", width: 120 },
  { field: "ba", headerName: "BA", width: 100 },
  { field: "obp", headerName: "OBP", width: 105 },
  { field: "slg", headerName: "SLG", width: 105 },
  { field: "babip", headerName: "BABIP", width: 115 },
  { field: "barrelpa", headerName: "PA/Barrels", width: 145 },
  { field: "barrels", headerName: "Barrels", width: 120 },
  { field: "bb", headerName: "BB", width: 100 },
  { field: "doubles", headerName: "2B", width: 100 },
  { field: "triples", headerName: "3B", width: 100 },
  { field: "hits", headerName: "Hits", width: 110 },
  { field: "hr", headerName: "HR", width: 100 },
  { field: "k", headerName: "K", width: 90 },
  { field: "swings", headerName: "Swings", width: 120 },
  { field: "whiffs", headerName: "Whiffs", width: 120 },
];
