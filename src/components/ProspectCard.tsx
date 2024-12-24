import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ValueChip from "./ValueChip";

const teamColors: { [id: string]: string[] } = {
  TBR: ["#02285C", "#90BDE7", "#FFFFFF"],
  BAL: ["#F25D23", "#000000", "#FFFFFF"],
  NYY: ["#132448", "#FFFFFF", "#FFFFFF"],
  BOS: ["#BD3039", "#0D2B56", "#FFFFFF"],
  TOR: ["#134A8E", "#E8291C", "#FFFFFF"],
  CLE: ["#E31937", "#002B5C", "#FFFFFF"],
  KCR: ["#004687", "#FFFFFF", "#FFFFFF"],
  DET: ["#0C2C56", "#FFFFFF", "#FFFFFF"],
  CHW: ["#000000", "#BFBFBF", "#FFFFFF"],
  MIN: ["#091F40", "#E31E34", "#FFFFFF"],
  HOU: ["#002D62", "#F4911E", "#FFFFFF"],
  SEA: ["#005C5C", "#0C2C56", "#FFFFFF"],
  TEX: ["#C0111F", "#003278", "#FFFFFF"],
  LAA: ["#BA0021", "#003263", "#C4CED4"],
  ATH: ["#00342C", "#FFB400", "#FFFFFF"],
  WSN: ["#AB0003", "#FFFFFF", "#FFFFFF"],
  NYM: ["#F75500", "#002C6E", "#FFFFFF"],
  MIA: ["#019CD6", "#E51829", "#FFFFFF"],
  PHI: ["#C21D39", "#01396F", "#FFFFFF"],
  ATL: ["#D3042B", "#001D3D", "#FFFFFF"],
  CIN: ["#C6011F", "#000000", "#FFFFFF"],
  PIT: ["#F7BF02", "#000000", "#FFFFFF"],
  CHC: ["#123581", "#E62F2E", "#FFFFFF"],
  MIL: ["#18294C", "#FEC430", "#FFFFFF"],
  STL: ["#BE0A15", "#FDDB00", "#FFFFFF"],
  LAD: ["#005A9D", "#FFFFFF", "#FFFFFF"],
  ARI: ["#C71128", "#00C2CE", "#FFFFFF"],
  SDP: ["#2D221C", "#FFC125", "#FFFFFF"],
  SFG: ["#231F20", "#F4793E", "#E8D8C4"],
  COL: ["#503E80", "#BFC2C9", "#FFFFFF"],
  FA: ["#BFBFBF", "#FFFFFF", "#FFFFFF"],
};

export default function ProspectCard({
  playerInfoProp,
}: {
  playerInfoProp: any;
}) {
  console.log(playerInfoProp.common.prospect[0]);

  return (
    <div>
      {playerInfoProp.common !== undefined &&
        playerInfoProp.common.prospect[0] !== undefined && (
          <div>
            <div
              style={{
                padding: "20px",
                backgroundColor:
                  playerInfoProp.common.teamInfo.MLB_AbbName !== null
                    ? teamColors[playerInfoProp.common.teamInfo.MLB_AbbName][0]
                    : teamColors["FA"][0],
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="h5">
                  <span
                    style={{
                      color:
                        playerInfoProp.common.teamInfo.MLB_AbbName !== null
                          ? teamColors[
                              playerInfoProp.common.teamInfo.MLB_AbbName
                            ][1]
                          : teamColors["FA"][1],
                      fontWeight: "bold",
                    }}
                  >
                    Prospect Info ({playerInfoProp.common.prospect[0].cSeason})
                  </span>
                </Typography>
              </Grid>
            </div>
            <div style={{ margin: "10px" }}>
              <Typography variant="h4" textAlign="center">
                <span style={{ fontWeight: "bold" }}>Future Value: </span>
                {playerInfoProp.common.prospect[0].cFV}{" "}
              </Typography>

              <Typography variant="h5" textAlign="center">
                <span style={{ fontWeight: "bold" }}>Risk: </span>
                {playerInfoProp.common.prospect[0].cRisk}{" "}
                <span style={{ fontWeight: "bold" }}> ⋅ ETA: </span>
                {playerInfoProp.common.prospect[0].cETA}
              </Typography>
              {playerInfoProp.common.playerInfo.Position !== "P" && (
                <div>
                  <ValueChip
                    name="Hit"
                    value={playerInfoProp.common.prospect[0].Hit}
                  ></ValueChip>
                  <ValueChip
                    name="Game Power"
                    value={playerInfoProp.common.prospect[0].Game}
                  ></ValueChip>
                  <ValueChip
                    name="Raw Power"
                    value={playerInfoProp.common.prospect[0].Raw}
                  ></ValueChip>
                  <ValueChip
                    name="Speed"
                    value={playerInfoProp.common.prospect[0].Spd}
                  ></ValueChip>
                  <ValueChip
                    name="Fielding"
                    value={playerInfoProp.common.prospect[0].Fld}
                  ></ValueChip>
                </div>
              )}
              {playerInfoProp.common.playerInfo.Position === "P" && (
                <div>
                  <ValueChip
                    name="Command"
                    value={playerInfoProp.common.prospect[0].CMD}
                  />
                  {playerInfoProp.common.prospect[0].FB !== "" && (
                    <ValueChip
                      name="Fastball"
                      value={playerInfoProp.common.prospect[0].FB}
                    />
                  )}
                  {playerInfoProp.common.prospect[0].CB !== "" && (
                    <ValueChip
                      name="Curveball"
                      value={playerInfoProp.common.prospect[0].CB}
                    />
                  )}
                  {playerInfoProp.common.prospect[0].CH !== "" && (
                    <ValueChip
                      name="Changeup"
                      value={playerInfoProp.common.prospect[0].CH}
                    />
                  )}
                  {playerInfoProp.common.prospect[0].SL !== "" && (
                    <ValueChip
                      name="Slider"
                      value={playerInfoProp.common.prospect[0].SL}
                    />
                  )}
                  {playerInfoProp.common.prospect[0].CT !== "" && (
                    <ValueChip
                      name="Cutter"
                      value={playerInfoProp.common.prospect[0].CT}
                    />
                  )}
                  {playerInfoProp.common.prospect[0].SPL !== "" && (
                    <ValueChip
                      name="Splitter"
                      value={playerInfoProp.common.prospect[0].SPL}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
