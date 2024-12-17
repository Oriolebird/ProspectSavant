import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export default function InfoCard({ playerInfoProp }: { playerInfoProp: any }) {


  return (
    <div>
      {playerInfoProp.common !== undefined && (
        <div style={{padding: "20px"}}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
              <Typography variant="h4">
                {playerInfoProp.common.playerInfo.firstLastName} ⋅ {playerInfoProp.common.playerInfo.Position}
              </Typography>
          </Grid>
          <Typography variant="h6">
            {playerInfoProp.common.teamInfo.MLB_FullName} ({playerInfoProp.common.teamInfo.llevel1})
          </Typography>
          <Typography variant="subtitle1">
            <span style={{fontWeight: "bold"}}>Age:</span> {playerInfoProp.common.playerInfo.AgeDisplay} ⋅ <span style={{fontWeight: "bold"}}>DOB:</span> {playerInfoProp.common.playerInfo.BirthDateDisplay}
          </Typography>
          <Typography variant="subtitle1">
          <span style={{fontWeight: "bold"}}>Bats/Throws:</span> {playerInfoProp.common.playerInfo.Bats}/{playerInfoProp.common.playerInfo.Throws} ⋅ <span style={{fontWeight: "bold"}}>Service Time:</span> {playerInfoProp.common.playerInfo.servicetime ? playerInfoProp.common.playerInfo.servicetime : "0.000"}
          </Typography>
        </div>
      )}
    </div>
  );
}
