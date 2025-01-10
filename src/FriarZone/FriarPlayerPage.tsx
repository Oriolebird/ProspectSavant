import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
  ScatterChart,
  Cell,
  ReferenceLine,
  Scatter,
} from "recharts";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Divider,
} from "@mui/material";
import { pitcher_columns, batter_columns } from "./utils/ColumnDefs";
import Grid from "@mui/material/Grid";
import { StripedDataGrid, getRowIdBatter, getRowIdPitcher, CustomPagination, CustomToolbar, CustomFooter } from "./utils/GridExtras";
import { EVENT_COLORS, labelFormatter, CustomLegend, legendEventColors, TRAJ_COLORS, legendTrajColors, COLORS, legendColors } from "./utils/ChartUtils";


export default function FriarPlayerPage(props: any) {
  const [playerType, setPlayerType] = useState("batter");
  const [swingData, setSwingData] = useState([]);
  const [sprayData, setSprayData] = useState([]);
  const [pitchData, setPitchData] = useState<any[]>([]);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    fetch("https://oriolebird.pythonanywhere.com/friar-type/" + props.id)
      .then((res) => res.json())
      .then((data) => {
        setPlayerType(data.type);
        //console.log("Type", data.type);
        if (data.type === "pitcher") {
          fetch(
            "https://oriolebird.pythonanywhere.com/friar-pitcher-data/" +
            props.id
          )
            .then((res) => res.json())
            .then((data) => {
              setPlayerData(data.data);
              //console.log("PDATA", data.data);
            });
          fetch(
            "https://oriolebird.pythonanywhere.com/friar-pitcher-pitches/" +
            props.id
          )
            .then((res) => res.json())
            .then((data) => {
              setPitchData(data.data);
              //console.log("PITCHDATA", data);
            });
        } else if (data.type === "batter") {
          fetch(
            "https://oriolebird.pythonanywhere.com/friar-batter-data/" +
            props.id
          )
            .then((res) => res.json())
            .then((data) => {
              setPlayerData(data.data);
              //console.log("DATA", data.data);
            });
          fetch(
            "https://oriolebird.pythonanywhere.com/friar-batter-swing/" +
            props.id
          )
            .then((res) => res.json())
            .then((data) => {
              setSwingData(data);
              //console.log("SWINGDATA", data);
            });
          fetch(
            "https://oriolebird.pythonanywhere.com/friar-batter-spray/" +
            props.id
          )
            .then((res) => res.json())
            .then((data) => {
              setSprayData(data.data);
              console.log("SPRAYDATA", data.data);
            });
        } else {
          console.log("NO SUCH PLAYER");
        }
      });
  }, [props.id]);





  function replaceLastHyphen(input: any): any {
    const lastIndex = input.lastIndexOf("-");
    if (lastIndex === -1) {
      return input; // No '-' found, return the string as-is
    }
    return input.slice(0, lastIndex) + " " + input.slice(lastIndex + 1);
  }

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        maxWidth="100%"
        alignContent="center"
        alignItems="center"
        padding="10px"
      >
        <Grid item maxWidth="90vw">
          <Box
            sx={{
              maxWidth: "90vw",
              width: "1200px",
              border: "#293241 solid 2px",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "1px 1px 1px black,2px 2px 1px white,3px 3px 1px black,4px 4px 3px",
            }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography
              variant="h2"
              style={{ margin: "5px", marginTop: "20px" }}
            >
              {replaceLastHyphen(props.id)}
            </Typography>
            <Divider variant="middle" flexItem />
            <Typography
              variant="h4"
              style={{ margin: "5px", marginTop: "20px" }}
            >
              Pitch Type Performance
            </Typography>
            <StripedDataGrid
              sx={{
                width: props.isDesktop.isDesktop ? "90%" : "95%",
                marginLeft: props.isDesktop.isDesktop ? "20px" : "1vw",
                marginRight: props.isDesktop.isDesktop ? "20px" : "1vw",
                marginTop: props.isDesktop.isDesktop ? "20px" : "1vw",
                marginBottom: props.isDesktop.isDesktop ? "20px" : "1vw",
                "&.MuiDataGrid-toolbarContainer": {
                  backgroundColor: "white",
                },
              }}
              getRowId={
                playerType === "batter" ? getRowIdBatter : getRowIdPitcher
              }
              rows={playerData}
              columns={
                playerType === "batter" ? batter_columns : pitcher_columns
              }
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              pagination
              pageSizeOptions={[]}
              slots={{
                pagination: CustomPagination,
                toolbar: CustomToolbar,
                footer: CustomFooter,
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: "count", sort: "desc" }],
                },
                density: "compact",
                columns: {
                  columnVisibilityModel: {
                    name: false
                  },
                },
              }}
            />
            <Divider variant="middle" flexItem />
            {playerType === "batter" && (
              <div>
                <Typography
                  variant="h4"
                  style={{ marginTop: "20px" }}
                  textAlign="center"
                >
                  Swing Speed Distribution
                </Typography>
                <BarChart
                  data={swingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 50,
                  }}
                  width={700}
                  height={400}
                  style={{ maxWidth: "95vw" }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bin">
                    <Label
                      value="Swing Speed"
                      offset={-10}
                      position="insideBottom"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Swings"
                      angle={-90}
                      position="insideLeft"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="count" fill="#3c302c" name="Swings" />
                </BarChart>
                <Divider variant="middle" flexItem />
                <Typography
                  variant="h4"
                  style={{ marginTop: "20px" }}
                  textAlign="center"
                >
                  Spray Chart (Results)
                </Typography>
                <ScatterChart
                  width={props.isDesktop.isDesktop ? 700 : 450}
                  height={props.isDesktop.isDesktop ? 475 : 300}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="x" unit="ft" domain={[-230, 230]} />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="y"
                    unit="ft"
                    domain={[0, 450]}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Spray Chart" data={sprayData} fill="#8884d8">
                    {sprayData.map((p: any, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={EVENT_COLORS[p.event_type]}
                      />
                    ))}
                  </Scatter>
                  {props.isDesktop.isDesktop && <svg>
                    {/* Foul line at +45 degrees */}
                    <line
                      x1={380}
                      y1={430}
                      x2={675}
                      y2={178}
                      stroke="black"
                      strokeWidth={2}
                    />
                    {/* Foul line at -45 degrees */}
                    <line
                      x1={380}
                      y1={430}
                      x2={85}
                      y2={178}
                      stroke="black"
                      strokeWidth={2}
                    />
                    <path
                      d="M85 178 Q 380 -50, 675 178"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>}
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    labelFormatter={labelFormatter}
                  />
                </ScatterChart>
                <CustomLegend colors={legendEventColors} />
                <Divider variant="middle" flexItem />
                <Typography
                  variant="h4"
                  style={{ marginTop: "20px" }}
                  textAlign="center"
                >
                  Spray Chart (Trajectory)
                </Typography>
                <ScatterChart
                  width={props.isDesktop.isDesktop ? 700 : 450}
                  height={props.isDesktop.isDesktop ? 475 : 300}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="x" unit="ft" domain={[-230, 230]} />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="y"
                    unit="ft"
                    domain={[0, 450]}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Spray Chart" data={sprayData} fill="#8884d8">
                    {sprayData.map((p: any, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={TRAJ_COLORS[p.hit_trajectory]}
                      />
                    ))}
                  </Scatter>
                  {props.isDesktop.isDesktop && <svg>
                    {/* Foul line at +45 degrees */}
                    <line
                      x1={380}
                      y1={430}
                      x2={675}
                      y2={178}
                      stroke="black"
                      strokeWidth={2}
                    />
                    {/* Foul line at -45 degrees */}
                    <line
                      x1={380}
                      y1={430}
                      x2={85}
                      y2={178}
                      stroke="black"
                      strokeWidth={2}
                    />
                    <path
                      d="M85 178 Q 380 -50, 675 178"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>}
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    labelFormatter={labelFormatter}
                  />
                </ScatterChart>
                <CustomLegend colors={legendTrajColors} />
              </div>
            )}
            {playerType === "pitcher" && (
              <div>
                <Typography
                  variant="h4"
                  style={{ marginTop: "20px" }}
                  textAlign="center"
                >
                  Pitch Movement Chart
                </Typography>
                <ScatterChart
                  width={props.isDesktop.isDesktop ? 700 : 400}
                  height={props.isDesktop.isDesktop ? 600 : 400}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="horz_break"
                    name="Horizontal Break"
                    unit="in"
                  />
                  <YAxis
                    type="number"
                    dataKey="induced_vert_break"
                    name="Vertical Break"
                    unit="in"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Pitch Movement"
                    data={pitchData}
                    fill="#8884d8"
                  >
                    {pitchData.map((p: any, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[p.pitch_type]} />
                    ))}
                  </Scatter>
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    labelFormatter={labelFormatter}
                  />
                  <ReferenceLine y={0} stroke="#000000" />
                  <ReferenceLine x={0} stroke="#000000" />
                  <ReferenceLine
                    segment={[
                      {
                        x: 0,
                        y: 0,
                      },
                      {
                        x: 0,
                        y: 0,
                      },
                    ]}
                    label={{
                      value: "(0 ,0)",
                      position: "bottom",
                    }}
                  />
                </ScatterChart>
                <CustomLegend colors={legendColors} />
                <Typography
                  variant="h4"
                  style={{ marginTop: "20px" }}
                  textAlign="center"
                >
                  Release Point Chart
                </Typography>
                <ScatterChart
                  width={props.isDesktop.isDesktop ? 700 : 400}
                  height={props.isDesktop.isDesktop ? 600 : 400}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="rel_side"
                    name="Release Side"
                    unit="ft"
                  />
                  <YAxis
                    type="number"
                    dataKey="rel_height"
                    name="Release Height"
                    unit="ft"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Pitch Movement"
                    data={pitchData}
                    fill="#8884d8"
                  >
                    {pitchData.map((p: any, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[p.pitch_type]} />
                    ))}
                  </Scatter>
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    labelFormatter={labelFormatter}
                  />
                  <ReferenceLine y={0} stroke="#000000" />
                  <ReferenceLine x={0} stroke="#000000" />
                  <ReferenceLine
                    segment={[
                      {
                        x: 0,
                        y: 0,
                      },
                      {
                        x: 0,
                        y: 0,
                      },
                    ]}
                    label={{
                      value: "(0 ,0)",
                      position: "bottom",
                    }}
                  />
                </ScatterChart>
                <CustomLegend colors={legendColors} />
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
