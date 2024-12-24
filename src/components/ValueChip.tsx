import React from "react";
import { Typography } from "@mui/material";

export default function ValueChip({ name, value }: { name: any; value: any }) {
  return (
    <div>
      <div
        style={{
          padding: "5px",
          backgroundColor: "#F2F2F2",
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          style={{ fontWeight: "bold" }}
        >
          {name}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" textAlign="center">
          {value}
        </Typography>
      </div>
    </div>
  );
}
