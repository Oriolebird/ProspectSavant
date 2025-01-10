import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Tabs,
  Tab,
} from "@mui/material";
import {
  pitcher_columns, batter_columns
} from "./utils/ColumnDefs";
import { StripedDataGrid, getRowIdBatter, CustomPagination, CustomToolbar, CustomFooter, getRowIdPitcher } from "./utils/GridExtras";
import { a11yProps, CustomTabPanel } from "./utils/TabExtras";


export default function FriarZone(props: any) {
  const [batterData, setBatterData] = useState([]);
  const [pitcherData, setPitcherData] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch("https://oriolebird.pythonanywhere.com/pitch-type-group-batter")
      .then((res) => res.json())
      .then((data) => {
        setBatterData(data.data);
        //console.log("DATA", data.data);
      });
    fetch("https://oriolebird.pythonanywhere.com/pitch-type-group-pitcher")
      .then((res) => res.json())
      .then((data) => {
        setPitcherData(data.data);
        //console.log("DATA", data.data);
      });
  }, []);


  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          paddingLeft={"50px"}
          flexDirection="row"
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Hitters" {...a11yProps(0)} />
            <Tab label="Pitchers" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <StripedDataGrid
            sx={{
              height: "80vh",
              marginLeft: props.isDesktop.isDesktop ? "20px" : "0px",
              marginRight: props.isDesktop.isDesktop ? "20px" : "0px",
              "&.MuiDataGrid-toolbarContainer": {
                backgroundColor: "white",
              },
            }}
            getRowId={getRowIdBatter}
            rows={batterData}
            columns={batter_columns}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <StripedDataGrid
            sx={{
              height: "80vh",
              marginLeft: props.isDesktop.isDesktop ? "20px" : "0px",
              marginRight: props.isDesktop.isDesktop ? "20px" : "0px",
              "&.MuiDataGrid-toolbarContainer": {
                backgroundColor: "white",
              },
            }}
            getRowId={getRowIdPitcher}
            rows={pitcherData}
            columns={pitcher_columns}
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
        </CustomTabPanel>
      </Box>
    </div>
  );
}
