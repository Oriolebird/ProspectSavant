import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import PlayerPage from "./components/PlayerPage";
import Leaderboard from "./components/Leaderboard";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TopNav from "./components/Topnav";

export default function App() {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const search = () => {
    fetch(`/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchText),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let id = data.id;
        navigate("/player/" + id);
      });
  };

  return (
    <div style={{ backgroundColor: "#E0FBFC" }}>
      <div>
        <TopNav
          search={search}
          searchText={searchText}
          setSearchText={setSearchText}
        ></TopNav>
      </div>
      <Routes>
        <Route path="/player/:id" element={<PlayerPageWrapper />} />
        <Route path="/leaders" element={<LeaderboardWrapper />} />
      </Routes>
    </div>
  );
}

const PlayerPageWrapper = () => {
  const { id } = useParams();
  return <PlayerPage id={id} />;
};

const LeaderboardWrapper = () => {
  return <Leaderboard />;
};
