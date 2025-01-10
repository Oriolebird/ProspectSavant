import React, { } from "react";
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
import {
    styled,
    alpha,
    TablePaginationProps,
} from "@mui/material";
import MuiPagination from "@mui/material/Pagination";

export const ODD_OPACITY = 0.2;

export const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
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

export function Pagination({
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

export function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export function CustomFooter() {
    return <GridFooter sx={{ backgroundColor: "#FFFFFF" }}></GridFooter>;
}

export function getRowIdBatter(row: any) {
    return row.batter_name_first + row.batter_name_last + row.pitch_type;
}

export function getRowIdPitcher(row: any) {
    return row.pitcher_name_first + row.pitcher_name_last + row.pitch_type;
}

export function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ backgroundColor: "#FFFFFF" }}>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}