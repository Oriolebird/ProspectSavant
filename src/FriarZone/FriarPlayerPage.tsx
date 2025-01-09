import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Label, ScatterChart, Cell, ReferenceLine, Scatter } from "recharts";
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  gridClasses,
  GridFooter,
  gridPageCountSelector,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  styled,
  alpha,
  TablePaginationProps,
  Typography,
  Divider,
} from "@mui/material";
import {
  pitcher_columns, batter_columns
} from "./utils/ColumnDefs";
import MuiPagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
      sx={{ backgroundColor: "#FFFFFF" }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function CustomFooter() {
  return <GridFooter sx={{ backgroundColor: "#FFFFFF" }}></GridFooter>;
}

const COLORS: { [id: string]: string } = {"4S":"#D22D49", "SL":"#EEE716", "CB":"#33DAF1", "2S":"#FE9D00", "CH":"#1DBE3A", "SW":"#DDB33A", "KN":"#6369D7", "CT":"#94412E", "SP":"#62BDBD"};

const legendColors: any[] = [
  { key: "4S", color: "#D22D49" },
  { key: "SL", color: "#EEE716" },
  { key: "CB", color: "#33DAF1" },
  { key: "2S", color: "#FE9D00" },
  { key: "CH", color: "#1DBE3A" },
  { key: "SW", color: "#DDB33A" },
  { key: "KN", color: "#6369D7" },
  { key: "CT", color: "#94412E" },
  { key: "SP", color: "#62BDBD" },
];


// Custom Legend Component
const CustomLegend: React.FC<{ colors: any[] }> = ({ colors }) => (
  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "15px", marginBottom: "20px", alignItems: "center", justifyContent: "center"}}>
    {colors.map((legend) => (
      <div key={legend.key} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: legend.color,
            marginRight: "8px",
          }}
        />
        <span style={{ fontSize: "14px" }}>{legend.key}</span>
      </div>
    ))}
  </div>
);

const labelFormatter = (label: number, payload: any) => {
  const dataPoint = payload.find((p: any) => p.payload.x === label);
  return dataPoint ? `Pitch Type: ${dataPoint.payload.pitch_type}` : label;
};



export default function FriarPlayerPage(props: any) {
  const [playerType, setPlayerType] = useState("batter");
  const [swingData, setSwingData] = useState([]);
  const [pitchData, setPitchData] = useState<any[]>([]);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    fetch("https://oriolebird.pythonanywhere.com/friar-type/" + props.id)
      .then((res) => res.json())
      .then((data) => {
        setPlayerType(data.type);
        //console.log("Type", data.type);
        if (data.type === "pitcher") {
          fetch("https://oriolebird.pythonanywhere.com/friar-pitcher-data/" + props.id)
            .then((res) => res.json())
            .then((data) => {
              setPlayerData(data.data);
              //console.log("PDATA", data.data);
            });
          fetch("https://oriolebird.pythonanywhere.com/friar-pitcher-pitches/" + props.id)
            .then((res) => res.json())
            .then((data) => {
              setPitchData(data.data);
              //console.log("PITCHDATA", data);
            });
        }
        else if (data.type === "batter") {
          fetch("https://oriolebird.pythonanywhere.com/friar-batter-data/" + props.id)
            .then((res) => res.json())
            .then((data) => {
              setPlayerData(data.data);
              //console.log("DATA", data.data);
            });
          fetch("https://oriolebird.pythonanywhere.com/friar-batter-swing/" + props.id)
            .then((res) => res.json())
            .then((data) => {
              setSwingData(data);
              //console.log("SWINGDATA", data);
            });
        }
        else {
          console.log("NO SUCH PLAYER")
        }
      });
  }, [props.id]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ backgroundColor: "#FFFFFF" }}>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  function getRowIdBatter(row: any) {
    return row.batter_name_first + row.batter_name_last + row.pitch_type
  }

  function getRowIdPitcher(row:any ){
    return row.pitcher_name_first + row.pitcher_name_last + row.pitch_type
  }

  function replaceLastHyphen(input: any): any {
    const lastIndex = input.lastIndexOf('-');
    if (lastIndex === -1) {
      return input; // No '-' found, return the string as-is
    }
    return input.slice(0, lastIndex) + " " + input.slice(lastIndex + 1);
  }

  return (
    <div>
      <Grid container justifyContent="center" spacing={2} maxWidth="100%" alignContent="center" alignItems="center" padding="10px">
        <Grid item maxWidth="90vw">
          <Box
            sx={{
              maxWidth: "90vw",
              width: "1200px",
              border: "#293241 solid 2px",
              backgroundColor: "#FFFFFF",
              boxShadow: "1px 1px 1px black,2px 2px 1px white,3px 3px 1px black,4px 4px 3px"
            }}
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
          >
            <Typography variant="h2" style={{ margin: "5px", marginTop: "20px" }}>{replaceLastHyphen(props.id)}</Typography>
            <Divider variant="middle" flexItem />
            <Typography variant="h4" style={{ margin: "5px", marginTop: "20px" }}>Pitch Type Performance</Typography>
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
              getRowId={playerType === "batter" ? getRowIdBatter : getRowIdPitcher}
              rows={playerData}
              columns={playerType === "batter" ? batter_columns : pitcher_columns}
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
              }}
            />
            <Divider variant="middle" flexItem />
            {playerType === "batter" && <div>
              <Typography variant="h4" style={{ marginTop: "20px" }} textAlign="center">Swing Speed Distribution</Typography>
              <BarChart
                data={swingData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 50,
                }}
                width={700} height={400}
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
            </div>}
            {playerType === "pitcher"&& <div>
              <Typography variant="h4" style={{ marginTop: "20px" }} textAlign="center">Pitch Movement Chart</Typography>
              <ScatterChart
                width={props.isDesktop.isDesktop ? 700: 400}
                height={props.isDesktop.isDesktop ? 600: 400}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="horz_break" name="Horizontal Break" unit="in" />
                <YAxis type="number" dataKey="induced_vert_break" name="Vertical Break" unit="in" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Pitch Movement" data={pitchData} fill="#8884d8">
                  {pitchData.map((p: any, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[p.pitch_type]} />
                  ))}
                </Scatter>
                <Tooltip cursor={{ strokeDasharray: "3 3" }} labelFormatter={labelFormatter} />
                <ReferenceLine y={0} stroke="#000000" />
                <ReferenceLine x={0} stroke="#000000" />
                <ReferenceLine
                  segment={[
                    {
                      x: 0,
                      y: 0
                    },
                    {
                      x: 0,
                      y: 0
                    }
                  ]}
                  label={{
                    value: "(0 ,0)",
                    position: "bottom"
                  }}
                />
              </ScatterChart>
              <CustomLegend colors={legendColors} />
              <Typography variant="h4" style={{ marginTop: "20px" }} textAlign="center">Release Point Chart</Typography>
              <ScatterChart
                width={props.isDesktop.isDesktop ? 700: 400}
                height={props.isDesktop.isDesktop ? 600: 400}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="rel_side" name="Release Side" unit="ft" />
                <YAxis type="number" dataKey="rel_height" name="Release Height" unit="ft" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Pitch Movement" data={pitchData} fill="#8884d8">
                  {pitchData.map((p: any, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[p.pitch_type]} />
                  ))}
                </Scatter>
                <Tooltip cursor={{ strokeDasharray: "3 3" }} labelFormatter={labelFormatter} />
                <ReferenceLine y={0} stroke="#000000" />
                <ReferenceLine x={0} stroke="#000000" />
                <ReferenceLine
                  segment={[
                    {
                      x: 0,
                      y: 0
                    },
                    {
                      x: 0,
                      y: 0
                    }
                  ]}
                  label={{
                    value: "(0 ,0)",
                    position: "bottom"
                  }}
                />
              </ScatterChart>
              <CustomLegend colors={legendColors} />
            </div>}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
