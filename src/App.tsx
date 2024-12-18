import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useState} from "react";
import PlayerPage from "./components/PlayerPage";
import Leaderboard from "./components/Leaderboard";
import TopNav from "./components/Topnav";

export default function App() {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const search = () => {
    fetch(`https://oriolebird.pythonanywhere.com/search/`, {
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
        <Route path="/" element={<Navigate to="/leaders" />} />
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
