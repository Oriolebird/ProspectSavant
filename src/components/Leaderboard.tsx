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
import { Tabs, Tab, styled, alpha, TablePaginationProps, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup} from "@mui/material";
import { hitter_columns, hitter_columns_mobile, pitcher_columns, pitcher_columns_mobile} from "./utils/ColumnDefs";
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
      sx={{ backgroundColor: "#FFFFFF" }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

function CustomFooter() {
  return (
    <GridFooter sx={{ backgroundColor: "#FFFFFF" }}>

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

  const h_columns = props.isDesktop.isDesktop ? hitter_columns : hitter_columns_mobile;
  const p_columns = props.isDesktop.isDesktop ? pitcher_columns : pitcher_columns_mobile;

  const [level, setLevel] = React.useState('AAA');

  const handleLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
  };
  console.log(level)

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ backgroundColor: "#FFFFFF" }}>
        <GridToolbarColumnsButton slotProps={{ button: {} }} />
        <GridToolbarFilterButton slotProps={{ button: {} }} />
        <GridToolbarDensitySelector slotProps={{ button: {} }} />
        <GridToolbarExport slotProps={{ button: {} }} />
        {level==="A" && <div>
          <span style={{fontWeight: "bold", color: "#DC707A"}}>** Only 10 Organizations Have Single A Data Available **</span>
        </div>
        }
      </GridToolbarContainer>
    )
  }

  useEffect(() => {
    console.log("Data: ", level);

      fetch("https://oriolebird.pythonanywhere.com/leaders/hitters/" + level)
        .then((res) => res.json())
        .then((data) => {
          setHitterData(data.data);
          console.log("HDATA", data.data);
        });
      fetch("https://oriolebird.pythonanywhere.com/leaders/pitchers/" + level)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPitcherData(data.data);
          console.log("PDATA", data.data);
        });
    
  }, [level]);

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
        <div style={{ marginTop: "10px", marginBottom: "-20px", marginLeft: "30px", verticalAlign: "baseline" }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Level</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="A" control={<Radio
                checked={level === 'A'}
                onChange={handleLevel}
                value="A"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              />} label="A" />
              <FormControlLabel value="AAA" control={<Radio
                checked={level === 'AAA'}
                onChange={handleLevel}
                value="AAA"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'AAA' }}
              />} label="AAA" />
            </RadioGroup>
          </FormControl>

        </div>
        <CustomTabPanel value={value} index={0}>
          <StripedDataGrid
            rows={hitterData}
            sx={{
              height: "80vh",
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
