import React from "react";

export const COLORS: { [id: string]: string } = {
    "4S": "#D22D49",
    SL: "#EEE716",
    CB: "#33DAF1",
    "2S": "#FE9D00",
    CH: "#1DBE3A",
    SW: "#DDB33A",
    KN: "#6369D7",
    CT: "#94412E",
    SP: "#62BDBD",
};

export const EVENT_COLORS: { [id: string]: string } = {
    field_out: "#BDBDBD",
    single: "#008000",
    double: "#0000FF",
    home_run: "#f7eb11",
    grounded_into_double_play: "#BDBDBD",
    force_out: "#BDBDBD",
    field_error: "#BDBDBD",
    sac_fly: "#BDBDBD",
    sac_bunt: "#BDBDBD",
    triple: "#f42f11",
    double_play: "#BDBDBD",
    fielders_choice_out: "#BDBDBD",
    fielders_choice: "#BDBDBD",
};

export const TRAJ_COLORS: { [id: string]: string } = {
    ground_ball: "#BDBDBD",
    line_drive: "#008000",
    fly_ball: "#0000FF",
};

export const legendColors: any[] = [
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

export const legendEventColors: any[] = [
    { key: "Out", color: "#BDBDBD" },
    { key: "Single", color: "#008000" },
    { key: "Double", color: "#0000FF" },
    { key: "Triple", color: "#f42f11" },
    { key: "Home Run", color: "#f7eb11" },
];

export const legendTrajColors: any[] = [
    { key: "Ground Ball", color: "#BDBDBD" },
    { key: "Line Drive", color: "#008000" },
    { key: "Fly Ball", color: "#0000FF" },
];

// Custom Legend Component
export const CustomLegend: React.FC<{ colors: any[] }> = ({ colors }) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "20px",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
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

export const labelFormatter = (label: number, payload: any) => {
    const dataPoint = payload.find((p: any) => p.payload.x === label);
    return dataPoint ? `Pitch Type: ${dataPoint.payload.pitch_type}` : label;
};
