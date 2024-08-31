import { useState, useEffect} from "react"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function PlayerPage(props){
    const [playerData, setPlayerData] = useState({});

    useEffect(() => {
        fetch('/player/'+props.id).then(res => res.json()).then(data => {
        setPlayerData(data);
        });
    }, [props.id]);

    return(
        <div>
            <Grid container justifyContent="center" spacing={2}>
                {[0, 1, 2].map((value) => (
                    <Grid key={value} item>
                    <Paper
                        sx={{
                        height: 600,
                        width: 300,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    />
                    </Grid>
                ))}
            </Grid>
            <div>
                <h2>{playerData.name} ({props.id})</h2>
                <h3>xwOBA Percentile: {Number(playerData.xwoba_p).toFixed(2)*100} ({playerData.xwoba})</h3>
                <h3>xBA Percentile: {Number(playerData.xba_p).toFixed(2)*100} ({playerData.xba})</h3>
                <h3>xSLG Percentile: {Number(playerData.xslg_p).toFixed(2)*100} ({playerData.xslg})</h3>
                <h3>Avg Exit Velo Percentile: {Number(playerData.ev_p).toFixed(2)*100} ({playerData.ev} mph)</h3>
                <h3>Barrel % Percentile: {Number(playerData.barrelbbe_p).toFixed(2)*100} ({playerData.barrelbbe}%)</h3>
                <h3>Hard Hit % Percentile: {Number(playerData.hhrate_p).toFixed(2)*100} ({playerData.hhrate}%)</h3>
                <h3>Chase % Percentile: {100-Number(playerData.chaserate_p).toFixed(2)*100} ({playerData.chaserate}%)</h3>
                <h3>Whiff % Percentile: {100-Number(playerData.whiffrate_p).toFixed(2)*100} ({playerData.whiffrate}%)</h3>
                <h3>K % Percentile: {100 - Number(playerData.krate_p).toFixed(2)*100} ({playerData.krate}%)</h3>
                <h3>BB % Percentile: {Number(playerData.bbrate_p).toFixed(2)*100} ({playerData.bbrate}%)</h3>
                <div>
                    {
                        Object.keys(playerData).map((key, index) => ( 
                        <p key={index}>{key} : {playerData[key]}</p> 
                        ))
                    }
                </div>
            </div>
        </div>
    )
  }