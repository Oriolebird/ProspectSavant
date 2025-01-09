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
  Tabs,
  Tab,
  styled,
  alpha,
  TablePaginationProps,
} from "@mui/material";
import {
  pitcher_columns, batter_columns
} from "./utils/ColumnDefs";
import MuiPagination from "@mui/material/Pagination";
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

  function CustomToolbar() {
      return (
        <GridToolbarContainer sx={{ backgroundColor: "#FFFFFF" }}>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      );
    }

  function getRowIdBatter(row:any ){
    return row.batter_name_first + row.batter_name_last + row.pitch_type
  }  

  function getRowIdPitcher(row:any ){
    return row.pitcher_name_first + row.pitcher_name_last + row.pitch_type
  }

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
              marginLeft: props.isDesktop.isDesktop ? "20px": "0px",
              marginRight: props.isDesktop.isDesktop ? "20px": "0px",
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
              marginLeft: props.isDesktop.isDesktop ? "20px": "0px",
              marginRight: props.isDesktop.isDesktop ? "20px": "0px",
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
