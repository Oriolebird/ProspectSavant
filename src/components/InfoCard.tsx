import Slider, { SliderThumb } from "@mui/material/Slider";
import chroma from "chroma-js";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export default function InfoCard({ playerInfoProp }: { playerInfoProp: any }) {
  const [playerInfo, setPlayerInfo] = useState<any>(playerInfoProp);
  //console.log(playerInfoProp, teamInfoProp);

  

  return (
    <div>
      {playerInfo.common != undefined && (
        <div style={{padding: "20px"}}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
              <Typography variant="h4">
                {playerInfo.common.playerInfo.firstLastName} ⋅ {playerInfo.common.playerInfo.Position}
              </Typography>
          </Grid>
          <Typography variant="h6">
            {playerInfo.common.teamInfo.MLB_FullName} ({playerInfo.common.teamInfo.llevel1})
          </Typography>
          <Typography variant="subtitle1">
            <span style={{fontWeight: "bold"}}>Age:</span> {playerInfo.common.playerInfo.AgeDisplay} ⋅ <span style={{fontWeight: "bold"}}>DOB:</span> {playerInfo.common.playerInfo.BirthDateDisplay}
          </Typography>
          <Typography variant="subtitle1">
          <span style={{fontWeight: "bold"}}>Bats/Throws:</span> {playerInfo.common.playerInfo.Bats}/{playerInfo.common.playerInfo.Throws} ⋅ <span style={{fontWeight: "bold"}}>Service Time:</span> {playerInfo.common.playerInfo.servicetime ? playerInfo.common.playerInfo.servicetime : "0.000"}
          </Typography>
        </div>
      )}
    </div>
  );
}
