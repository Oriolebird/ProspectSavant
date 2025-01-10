import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react"; 
import Paypal from "./images/Paypal.png"

export default function Donate(props: any) {

  return ( 
    <div style={{margin: "5px"}}>

      <Grid container justifyContent="center">
              <Paper
                sx={{
                  width: 700,
                  maxWidth: "95vw",
                  height: "100%",
                  border: "#293241 solid 1px",
                  padding: "10px",
                }}
                square
                variant="outlined"
              >
                <Grid container justifyContent="center" alignItems="center" flexDirection="column" spacing={0} display="flex">
                  <Typography variant="h4" style={{textAlign: "center", fontWeight: "bold", margin: "10px"}}>Donate to Prospect Savant</Typography>
                  <Typography variant="subtitle2" style={{textAlign: "center", margin: "10px", fontSize: "15pt"}}>Donations to keep Prospect Savant running (and to encourage me to work on it more in my free time) are gladly accepted at the link below.</Typography>
                  <Typography variant="subtitle1" style={{textAlign: "center", margin: "10px", fontSize: "14pt"}}>Prospect Savant is a one man fan made project that I work on in my spare time. This project is meant to be a free tool for fans - I never intend to run ads on the site or make a profit from it. However, I do pay for monthly domain and hosting services, so donations to cover those costs are appreciated.</Typography>
                  <Grid>
                    <a href="https://paypal.me/ProspectSavant?country.x=US&locale.x=en_US" style={{margin: "auto", width: "100%"}}>
                                  <img
                                    src={Paypal}
                                    alt=""
                                    style={{maxWidth: "75vw", maxHeight: "200px"}}
                                  />
                                </a>
                                </Grid>
                </Grid>
              </Paper>
            </Grid>
    </div>
  );
}
