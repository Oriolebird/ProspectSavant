import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import PlayerCardRow from "./PlayerCardRow";
import { Divider } from "@mui/material";
import InfoCard from "./InfoCard";
import Strider from "./Strider.png";
import Ohtani from "./Ohtani.png";
import ProspectCard from "./ProspectCard";
import ProspectWriteup from "./ProspectWriteup";

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

export default function PlayerPage(props: any) {
  const [playerData, setPlayerData] = useState<any>({});
  const [playerInfo, setPlayerInfo] = useState<any>({});

  useEffect(() => {
    fetch("https://oriolebird.pythonanywhere.com/player/" + props.id)
      .then((res) => res.json())
      .then((data1) => {
        setPlayerData(data1);
        fetch(`https://oriolebird.pythonanywhere.com/player-info/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playerUrlProp: data1["UPURL"] }),
        })
          .then((res) => res.json())
          .then((data2) => {
            setPlayerInfo(data2);
            console.log("D: ", data2);
          });
        console.log(data1);
      });
  }, [props.id]);
  console.log(playerData.MLB_AbbName);
  return (
    <div>
      {playerData !== undefined && playerData !== null && (
        <div style={{ marginBottom: "10px" }}>
          <Grid container justifyContent="center" spacing={2} maxWidth="100%">
            <Grid item maxWidth="90vw">
              <Paper
                sx={{
                  height: "100%",
                  maxWidth: "90vw",
                  width: 500,
                  border: "#293241 solid 1px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                square
                variant="outlined"
              >
                {playerInfo.common && <InfoCard playerInfoProp={playerInfo} />}
              </Paper>
            </Grid>
            <Grid item maxWidth="90vw">
              {playerData.xwoba_p !== "undefined" &&
                !isNaN(playerData.xwoba_p) && (
                  <Paper
                    sx={{
                      maxWidth: "90vw",
                      height: "100%",
                      width: 500,
                      border: "#293241 solid 1px",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                    square
                    variant="outlined"
                  >
                    {playerData.Position === "P" && (
                      <div>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          style={{
                            backgroundColor: playerData.MLB_AbbName
                              ? teamColors[playerData.MLB_AbbName][0]
                              : teamColors["FA"][0],
                            paddingLeft: "10px",
                            paddingBottom: "10px",
                            marginBottom: "10px",
                            wordWrap: "break-word",
                          }}
                        >
                          <img
                            src={Strider}
                            height="64px"
                            alt=""
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                          />
                          <span
                            style={{
                              marginLeft: "10px",
                              fontSize: "17pt",
                              fontWeight: "bold",
                              color: playerData.MLB_AbbName
                                ? teamColors[playerData.MLB_AbbName][1]
                                : teamColors["FA"][1],
                            }}
                          >
                            {playerData.level === "AAA" ? "AAA" : "High A"}{" "}
                            Pitching Percentiles
                          </span>
                        </Grid>
                        <div>
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
                          <Divider variant="middle" />
                        </div>
                      </div>
                    )}
                    {playerData.Position !== "P" && (
                      <div>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          style={{
                            backgroundColor: playerData.MLB_AbbName
                              ? teamColors[playerData.MLB_AbbName][0]
                              : teamColors["FA"][0],
                            paddingLeft: "10px",
                            paddingBottom: "10px",
                            marginBottom: "10px",
                            wordWrap: "break-word",
                          }}
                        >
                          <img
                            src={Ohtani}
                            height="64px"
                            alt=""
                            style={{ marginLeft: "10px", marginTop: "10px" }}
                          />
                          <span
                            style={{
                              marginLeft: "10px",
                              fontSize: "18pt",
                              fontWeight: "bold",
                              marginTop: "10px",
                              color: playerData.MLB_AbbName
                                ? teamColors[playerData.MLB_AbbName][1]
                                : teamColors["FA"][1],
                            }}
                          >
                            {playerData.level === "AAA" ? "AAA" : "High A"}{" "}
                            Hitting Percentiles
                          </span>
                        </Grid>
                        <div>
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
                          <Divider variant="middle" />
                          <PlayerCardRow
                            stat="Spd"
                            value={playerData.spd.toFixed(2)}
                            percentile={playerData.spd_p.toFixed(2) * 100}
                            percentile_raw={playerData.spd_p}
                          />
                          <Divider variant="middle" />
                          <PlayerCardRow
                            stat="wBsR/PA"
                            value={playerData.wbsr_pa.toFixed(4)}
                            percentile={playerData.wbsr_pa_p * 100}
                            percentile_raw={playerData.wbsr_pa_p}
                          />
                        </div>
                      </div>
                    )}
                  </Paper>
                )}
            </Grid>
            <Grid item maxWidth="90vw">
              <Paper
                sx={{
                  maxWidth: "90vw",
                  height: "100%",
                  width: 500,
                  border: "#293241 solid 1px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                square
                variant="outlined"
              >
                {playerInfo.common && (
                  <ProspectCard playerInfoProp={playerInfo} />
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            spacing={2}
            maxWidth="100%"
            style={{ marginTop: "30px" }}
          >
            <Grid item maxWidth="90vw">
              <Paper
                sx={{
                  maxWidth: "90vw",
                  height: "100%",
                  width: "1000px",
                  border: "#293241 solid 1px",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                square
                variant="outlined"
              >
                {playerInfo.common && (
                  <ProspectWriteup playerInfoProp={playerInfo} />
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
