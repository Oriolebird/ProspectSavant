import Slider, { SliderThumb } from "@mui/material/Slider";
import chroma from "chroma-js";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

export default function InfoCard({ playerUrlProp }: { playerUrlProp: any }) {
  const [playerUrl, setPlayerUrl] = useState<any>(playerUrlProp);
  const [playerInfo, setPlayerInfo] = useState<any>({});
  //console.log(playerInfoProp, teamInfoProp);

  useEffect(() => {
    console.log("URL: " + JSON.stringify(playerUrlProp));
    setPlayerInfo(playerUrlProp);
    fetch(`/player-info/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerUrlProp }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayerInfo(data);
        console.log("D: ", data);
      });
  }, [playerUrlProp]);

  return (
    <div>
      {playerInfo.common != undefined && (
        <div>
          <Grid
            container
            spacing={1}
            columns={16}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid size={10}>
              <Typography variant="h3">
                {playerInfo.common.playerInfo.firstLastName}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2">
            {playerInfo.common.prospect[0].Summary}
          </Typography>
        </div>
      )}
    </div>
  );
}
