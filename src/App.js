import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import PlayerPage from "./components/PlayerPage";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function App() {
  const [searchText, setSearchText] = useState("")

  const navigate = useNavigate(); 
  
  const search = () =>{
    console.log("Searching for player: "+searchText)
    fetch(`/search/`,{
      'method':'POST',
       headers : {
      'Content-Type':'application/json'
    },
      body:JSON.stringify(searchText)
    }).then(res =>
      res.json()).then(data => {
        console.log(data)
        let id = data.id
        navigate("/player/"+id)
      }
    )
  }


  return (
      <div>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search For a Player"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  search()
                  ev.preventDefault();
                }
              }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={search}>
              <SearchIcon />
            </IconButton>
        </Paper>

        <Routes>
          <Route path='/player/:id' element={<PlayerPageWrapper/>}/>
        </Routes>
      </div>
  );
}

const PlayerPageWrapper = () => {
  const { id } = useParams();
  return <PlayerPage id={id} />;
};


