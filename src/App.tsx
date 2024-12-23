import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState} from "react";
import PlayerPage from "./components/PlayerPage";
import Leaderboard from "./components/Leaderboard";
import TopNav from "./components/Topnav";
import { Divider } from "@mui/material";
import Glossary from "./components/Glossary";
import Footer from "./components/Footer";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

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

  const setVP = () => {
    setDesktop(window.innerWidth > 1450)
  }

  useEffect(() => {
    window.addEventListener("resize", setVP, false);
  }, []);

  return (
    <div style={{ backgroundColor: "#E0FBFC",  width: "100%"}}>
      <div>
        <TopNav
          search={search}
          searchText={searchText}
          setSearchText={setSearchText}
          isDesktop={isDesktop}
        ></TopNav>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/leaders" />} />
        <Route path="/player/:id" element={<PlayerPageWrapper />} />
        <Route path="/leaders" element={<LeaderboardWrapper isDesktop={isDesktop}/>} />
      </Routes>
      <div>
        <Divider variant="fullWidth"/>
        <Glossary/>
        <Footer/>
      </div>
    </div>
  );
}

const PlayerPageWrapper = () => {
  const { id } = useParams();
  return <PlayerPage id={id} />;
};

const LeaderboardWrapper = (isDesktop: any) => {
  return <Leaderboard isDesktop={isDesktop}/>;
};


//TODO: ADD GLOSSARY
//TODO: ADD 2023
//TODO: FUZZY SEARCH
//TODO: ADD EV90, MAX EV, ZCON%, ZSWING%, OCON%, SWING%
//TODO: DEFENSE / BASERUNNING
//TODO: FVs
//TODO: MORE PLAYER RANKING/INFO/DRAFT/STATS/WRITEUP
//TODO: SCORE PAGES
//TODO: SPIN RATES, PITCH GRADES?
//
//TODO: SELECTION OPTIONS FOR LEADERBOARD

