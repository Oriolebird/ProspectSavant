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
  GridToolbarFilterButton,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Tabs, Tab, styled, alpha, TablePaginationProps } from "@mui/material";
import { hitter_columns, pitcher_columns } from "./utils/ColumnDefs";
import MuiPagination from '@mui/material/Pagination';

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

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
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
      sx={{backgroundColor: "#FFFFFF"}}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{backgroundColor: "#FFFFFF"}}>
      <GridToolbarColumnsButton slotProps={{button:{}}} />
      <GridToolbarFilterButton slotProps={{button:{}}} />
      <GridToolbarDensitySelector slotProps={{button:{}}} />
      <GridToolbarExport slotProps={{button:{}}} />
    </GridToolbarContainer>
  )
}
function CustomFooter() {
  return (
    <GridFooter sx={{backgroundColor: "#FFFFFF"}}>
      
    </GridFooter>
  )
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
      <Box sx={{ width: "100%" }}>
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
            sx={{ height: "80vh",
              "&.MuiDataGrid-toolbarContainer": {
                backgroundColor: "white",
              }
            }}
            columns={h_columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            pagination
            slots={{
              pagination: CustomPagination,
              toolbar: CustomToolbar,
              footer: CustomFooter
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: 'score_p', sort: 'desc' }],
              },
              density: 'compact',
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <StripedDataGrid
            sx={{
              height: "80vh", 
              "&.MuiDataGrid-toolbarContainer": {
                backgroundColor: "white",
              }
            }}
            rows={pitcherData}
            columns={p_columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            pagination
            slots={{
              pagination: CustomPagination,
              toolbar: CustomToolbar,
              footer: CustomFooter
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: 'score_p', sort: 'desc' }],
              },
              density: 'compact',
            }}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
