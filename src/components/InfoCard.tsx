import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

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
  "0": ["#BFBFBF", "#FFFFFF", "#FFFFFF"],
};

export default function InfoCard({ playerInfoProp }: { playerInfoProp: any }) {
  console.log(playerInfoProp);
  return (
    <div>
      {playerInfoProp.common !== undefined && (
        <div>
          <div
            style={{
              padding: "20px",
              backgroundColor:
                playerInfoProp.common.teamInfo !== undefined &&
                "MLB_AbbName" in playerInfoProp.common.teamInfo &&
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
              <Typography variant="h4">
                <span
                  style={{
                    color:
                      playerInfoProp.common.teamInfo !== undefined &&
                      "MLB_AbbName" in playerInfoProp.common.teamInfo &&
                      playerInfoProp.common.teamInfo.MLB_AbbName !== null
                        ? teamColors[
                            playerInfoProp.common.teamInfo.MLB_AbbName
                          ][1]
                        : teamColors["FA"][1],
                  }}
                >
                  {playerInfoProp.common.playerInfo.firstLastName} ⋅{" "}
                  {playerInfoProp.common.playerInfo.Position}
                </span>
              </Typography>
            </Grid>
            <Typography variant="h6">
              <span
                style={{
                  color:
                    playerInfoProp.common.teamInfo !== undefined &&
                    "MLB_AbbName" in playerInfoProp.common.teamInfo &&
                    playerInfoProp.common.teamInfo.MLB_AbbName !== null
                      ? teamColors[
                          playerInfoProp.common.teamInfo.MLB_AbbName
                        ][2]
                      : teamColors["FA"][2],
                }}
              >
                {playerInfoProp.common.teamInfo !== undefined
                  ? playerInfoProp.common.teamInfo.MLB_FullName
                  : "Free Agent"}{" "}
                (
                {playerInfoProp.common.teamInfo !== undefined
                  ? playerInfoProp.common.teamInfo.llevel1
                  : ""}
                )
              </span>
            </Typography>
            <Typography variant="subtitle1">
              <span
                style={{
                  color:
                    playerInfoProp.common.teamInfo !== undefined &&
                    "MLB_AbbName" in playerInfoProp.common.teamInfo &&
                    playerInfoProp.common.teamInfo.MLB_AbbName !== null
                      ? teamColors[
                          playerInfoProp.common.teamInfo.MLB_AbbName
                        ][2]
                      : teamColors["FA"][2],
                }}
              >
                <span style={{ fontWeight: "bold" }}>Age:</span>{" "}
                {playerInfoProp.common.playerInfo.AgeDisplay} ⋅{" "}
                <span style={{ fontWeight: "bold" }}>DOB:</span>{" "}
                {playerInfoProp.common.playerInfo.BirthDateDisplay}
              </span>
            </Typography>
            <Typography variant="subtitle1">
              <span
                style={{
                  color:
                    playerInfoProp.common.teamInfo !== undefined &&
                    "MLB_AbbName" in playerInfoProp.common.teamInfo &&
                    playerInfoProp.common.teamInfo.MLB_AbbName !== null
                      ? teamColors[
                          playerInfoProp.common.teamInfo.MLB_AbbName
                        ][0]
                      : teamColors["FA"][0],
                }}
              >
                <span style={{ fontWeight: "bold" }}>Bats/Throws:</span>{" "}
                {playerInfoProp.common.playerInfo.Bats}/
                {playerInfoProp.common.playerInfo.Throws} ⋅{" "}
                <span style={{ fontWeight: "bold" }}>Service Time:</span>{" "}
                {playerInfoProp.contract.serviceTime
                  ? playerInfoProp.contract.serviceTime
                  : "0.000"}
              </span>
            </Typography>
          </div>
          <div style={{ padding: "20px" }}>
            {playerInfoProp.common.prospect[0] !== undefined && (
              <div>
                <Typography variant="h6">
                  Ranks From Report: {playerInfoProp.common.prospect[0].Type}
                  <br />
                  <span style={{ fontWeight: "bold" }}>Overall Rank: </span>
                  {playerInfoProp.common.prospect[0].Ovr_Rank
                    ? playerInfoProp.common.prospect[0].Ovr_Rank
                    : "NR"}
                  {"  ⋅  "}
                  <span style={{ fontWeight: "bold" }}>Org Rank: </span>
                  {playerInfoProp.common.prospect[0].Org_Rank
                    ? playerInfoProp.common.prospect[0].Org_Rank
                    : "NR"}
                </Typography>
              </div>
            )}
            {playerInfoProp.draft !== null && (
              <div>
                <Typography variant="subtitle1">
                  <span style={{ fontWeight: "bold" }}>Draft: </span>
                  {playerInfoProp.draft.season} {playerInfoProp.draft.draftType}
                  , Pick {playerInfoProp.draft.pickNumber} (Round{" "}
                  {playerInfoProp.draft.pickRound}, Pick{" "}
                  {playerInfoProp.draft.roundPickNumber})
                  <br />
                  <span style={{ fontWeight: "bold" }}>Draft Team: </span>
                  {playerInfoProp.draft.TeamName}
                  <br />
                  <span style={{ fontWeight: "bold" }}>Signing Bonus: </span>
                  {playerInfoProp.draft.signingBonusFormat}
                  <br />
                  <span style={{ fontWeight: "bold" }}>School: </span>
                  {playerInfoProp.draft.schoolName}
                  <br />
                </Typography>
              </div>
            )}
            {playerInfoProp.draft === null && (
              <div>
                <Typography variant="subtitle1">
                  <span style={{ fontWeight: "bold" }}>Draft: UDFA</span>
                  {playerInfoProp.common.prospect[0] !== undefined && (
                    <div>
                      <span style={{ fontWeight: "bold" }}>Signing Org: </span>
                      {playerInfoProp.common.prospect[0].Signed_Org} (
                      {playerInfoProp.common.prospect[0].Signed_Yr})
                      <br />
                      <span style={{ fontWeight: "bold" }}>
                        Signing Bonus:{" "}
                      </span>
                      ${playerInfoProp.common.prospect[0].Sign_Bonus}
                      <br />
                      <span style={{ fontWeight: "bold" }}>School: </span>
                      {playerInfoProp.common.prospect[0].School}
                      <br />
                    </div>
                  )}
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
