import React, { useState, useEffect } from "react";
import {
  DataGrid,
  gridClasses,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Tabs, Tab, styled, alpha } from "@mui/material";
import { hitter_columns, pitcher_columns } from "./utils/ColumnDefs";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Leaderboard(props: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [hitterData, setHitterData] = useState([]);
  const [pitcherData, setPitcherData] = useState([]);

  const h_columns = hitter_columns;
  const p_columns = pitcher_columns;

  useEffect(() => {
    console.log("Data: ", hitterData);
    if (hitterData.length === 0) {
      fetch("https://oriolebird.pythonanywhere.com/leaders/hitters")
        .then((res) => res.json())
        .then((data) => {
          setHitterData(data.data);
          console.log("HDATA", data.data);
        });
      fetch("https://oriolebird.pythonanywhere.com/leaders/pitchers")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPitcherData(data.data);
          console.log("PDATA", data.data);
        });
    }
  }, [hitterData]);

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%"}}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          paddingLeft={"50px"}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Hitters" {...a11yProps(0)} />
            <Tab label="Pitchers" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <StripedDataGrid
            rows={hitterData}
            sx={{height: "80vh"}}
            columns={h_columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <StripedDataGrid
            sx={{height: "80vh"}}
            rows={pitcherData}
            columns={p_columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
