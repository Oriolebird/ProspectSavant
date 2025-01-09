import {
  Routes,
  Route,
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import PlayerPage from "./components/PlayerPage";
import Leaderboard from "./components/Leaderboard";
import TopNav from "./components/Topnav";
import { Divider } from "@mui/material";
import Glossary from "./components/Glossary";
import Footer from "./components/Footer";
import Donate from "./components/Donate";
import FriarZone from "./FriarZone/FriarZone";
import FriarTopNav from "./FriarZone/FriarTopnav";
import FriarPlayerPage from "./FriarZone/FriarPlayerPage";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
  const [matches, setMatches] = useState([""]);
  const location = useLocation();

  const navigate = useNavigate();

  //console.log(location)

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
        let id = data.id;
        navigate("/player/" + id);
      });
  };

  useEffect(() => {
    //console.log("Text update");
    fetch(location.pathname.includes("friar-zone") ? 'https://oriolebird.pythonanywhere.com/search-fuzzy-friar': `https://oriolebird.pythonanywhere.com/search-fuzzy/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchText),
    })
      .then((res) => res.json())
      .then((data) => {
        const id = data;
        //console.log("FUZZY", id, data);
        setMatches(id);
      });
  }, [searchText, location.pathname]);

  const setVP = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener("resize", setVP, false);
  }, []);

  return (
    <div style={{ backgroundColor: location.pathname.includes("friar-zone")?"#fff7e5":"#E0FBFC", width: "100%", overflowY: "hidden"}}>
      {
        !location.pathname.includes("friar-zone") && <div>
          <TopNav
            search={search}
            searchText={searchText}
            setSearchText={setSearchText}
            isDesktop={isDesktop}
            matches={matches}
          ></TopNav>
        </div>
      }
      {
        location.pathname.includes("friar-zone") && <div>
          <FriarTopNav
            search={search}
            searchText={searchText}
            setSearchText={setSearchText}
            isDesktop={isDesktop}
            matches={matches}
          ></FriarTopNav>
        </div>
      }
      <Routes>
        <Route path="/" element={<Navigate to="/leaders" />} />
        <Route path="/player/:id" element={<PlayerPageWrapper isDesktop={isDesktop} />} />
        <Route
          path="/leaders"
          element={<LeaderboardWrapper isDesktop={isDesktop} />}
        />
        <Route
          path="/donate"
          element={<DonateWrapper isDesktop={isDesktop} />}
        />
        <Route
          path="/friar-zone"
          element={<FriarWrapper isDesktop={isDesktop} />}
        />
        <Route path="/friar-zone/player/:id" element={<FriarPlayerPageWrapper isDesktop={isDesktop} />} />
      </Routes>
      {
        !location.pathname.includes("friar-zone") && <div>
        <Divider variant="fullWidth" />
        <Glossary isDesktop={isDesktop} />
        <Footer />
      </div>}

    </div>
  );
}

const PlayerPageWrapper = (isDesktop: any) => {
  const { id } = useParams();
  return <PlayerPage id={id} isDesktop={isDesktop} />;
};

const FriarPlayerPageWrapper = (isDesktop: any) => {
  const { id } = useParams();
  return <FriarPlayerPage id={id} isDesktop={isDesktop} />;
};

const LeaderboardWrapper = (isDesktop: any) => {
  return <Leaderboard isDesktop={isDesktop} />;
};

const DonateWrapper = (isDesktop: any) => {
  return <Donate isDesktop={isDesktop} />;
};

const FriarWrapper = (isDesktop: any) => {
  return <FriarZone isDesktop={isDesktop} />;
};

//TODO: ADD 2023
//TODO: ADD EV90, MAX EV, ZCON%, ZSWING%, OCON%, SWING%
//TODO: MORE PLAYER RANKING/INFO/DRAFT/STATS/WRITEUP
//TODO: SCORE PAGES
//TODO: SPIN RATES, PITCH GRADES?
//
//TODO: SELECTION OPTIONS FOR LEADERBOARD
