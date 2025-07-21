import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.scss";
import { useAuth } from "../../../context/AuthContext";
import { ApiConfig } from "../../../config/ApiConfig";
import type { Scores } from "../../../types/Scores";

const Table: React.FC = () => {
  const [scores, setScores] = useState<Scores[]>([]);
  const { accessToken } = useAuth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    axios
      .get(`${ApiConfig.API_URL}api/scores/${currentYear}/top`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setScores(res.data))
      .catch((err) => {
        console.error("Failed to fetch scores:", err);
      });
  }, []);

  return (
    <div className="score-table-container">
      <h2>Premier League Predikcija — Rang Lista {currentYear}</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tim</th>
            <th>Korisnik</th>
            <th>Bodovi</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.scoreId}>
              <td>{index + 1}</td>
              <td>{score.user.teamName}</td>
              <td>{`${score.user.firstName} ${score.user.lastName}`}</td>
              <td>{score.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
