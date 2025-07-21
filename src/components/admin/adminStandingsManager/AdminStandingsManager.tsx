import { useEffect, useState } from "react";
import axios from "axios";
import "./adminStandingsManager.scss";
import { ApiConfig } from "../../../config/ApiConfig";
import UpdatePosition from "../updatePosition/UpdatePosition";
import { useAuth } from "../../../context/AuthContext";
import type { Teams } from "../../../types/Teams";

const AdminStandingsManager = () => {
  const [seasonYear, setSeasonYear] = useState<number>(() => {
    return Number(localStorage.getItem("seasonYear")) || new Date().getFullYear();
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    localStorage.setItem("seasonYear", seasonYear.toString());
  }, [seasonYear]);

  const handleInitialize = async () => {
    try {
      const res = await axios.get(ApiConfig.API_URL + `api/teams`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      });
      
      const allTeams: Teams[] = res.data;
  
      const standings = allTeams.map((team, index) => {
        if (!team.teamId) throw new Error(`Tim nema ID: ${team.name}`);
        return {
          teamId: team.teamId,
          position: index + 1,
        };
      });
  
      console.log("Payload koji se šalje:", {
        seasonYear,
        standings,
      });
  
      await axios.post(ApiConfig.API_URL + `api/standings/initialize`, {
        seasonYear,
        standings,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      setMessage("✅ Tabela uspešno inicijalizovana.");
      setError(null);
    } catch (err: any) {
      console.error("Greška:", err);
      setError("❌ Greška: Tabela možda već postoji za ovu sezonu ili timovi nisu pravilno učitani.");
      setMessage(null);
    }
  };  

  const handleReset = async () => {
    if (!window.confirm("Da li ste sigurni da želite obrisati tabelu za sezonu?")) return;

    try {
      await axios.delete(ApiConfig.API_URL + `api/standings/${seasonYear}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
      });
      setMessage("🗑️ Tabela uspešno resetovana.");
      setError(null);
    } catch (err) {
      setError("❌ Greška pri resetovanju tabele.");
      setMessage(null);
    }
  };

  return (
    <div className="admin-standings-manager">
      <h2>⚙️ Upravljanje tabelom sezone</h2>

      <div className="season-controls">
        <label htmlFor="season">Godina sezone:</label>
        <input
          id="season"
          type="number"
          value={seasonYear}
          onChange={(e) => setSeasonYear(Number(e.target.value))}
          min={2000}
          max={2100}
        />

        <button className="init-btn" onClick={handleInitialize}>Inicijalizuj sezonu</button>
        <button className="reset-btn" onClick={handleReset}>Resetuj sezonu</button>
      </div>

      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <UpdatePosition />
    </div>
  );
};

export default AdminStandingsManager;

