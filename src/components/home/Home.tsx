import { useEffect, useState } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import type { ActualStandings } from '../../types/ActualStandings';
import axios from 'axios';
import { ApiConfig } from '../../config/ApiConfig';

const Home = () => {
  const [standings, setStandings] = useState<ActualStandings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get<ActualStandings[]>(ApiConfig.API_URL + 'api/standings/2025')
      .then((res) => setStandings(res.data))
      .catch((err) => console.error("Greška prilikom dohvatanja tabele:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='home-container'>
      <section className="hero">
        <h1>🎯 Predictions Premier League 2025</h1>
        <p>Pridruži se i pokaži svoje fudbalsko znanje! Pravi predikcije i pokaži da si najbolji.
          Za predikciju se možete prijaviti do 14.8.2025.
        </p>
        <div className="cta-buttons">
          <button onClick={() => navigate('/register')}>Registruj se</button>
          <button onClick={() => navigate('/login')}>Prijavi se</button>
        </div>
      </section>

      <main>
        <h1>⚽ Engleska Premijer Liga – Aktuelna Tabela (2025)</h1>

        {loading ? (
          <div className="loader-container">
            <div className="spinner">
              <p>Učitavanje tabele...</p>
            </div>
          </div>
        ) : (
          <table className="league-table">
            <thead>
              <tr>
                <th>Poz</th>
                <th>Tim</th>
                <th>Logo</th>
                <th>Skraćeno</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((entry) => (
                <tr key={entry.actualStandingId}>
                  <td>{entry.position}</td>
                  <td>{entry.team.name}</td>
                  <td>
                    <img
                      src={entry.team.logoUrl}
                      alt={entry.team.shortName}
                      width={30}
                      height={30}
                    />
                  </td>
                  <td>{entry.team.shortName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Home;
