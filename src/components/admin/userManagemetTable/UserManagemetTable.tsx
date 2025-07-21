import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiConfig } from '../../../config/ApiConfig';
import { useAuth } from '../../../context/AuthContext';
import './userManagemetTable.scss';

import type { Users } from '../../../types/Users';
import type { Scores } from '../../../types/Scores';
import type { PredictionItems } from '../../../types/PredictionsItems';

import PredictionModal from '../../../modals/user/PredicitionModal';
import ScoreModal from '../../../modals/user/ScoreModal';

const UserManagementTable = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ email: '', firstName: '', lastName: '', teamName: '' });

  const [selectedScores, setSelectedScores] = useState<Scores[] | null>(null);
  const [selectedPredictions, setSelectedPredictions] = useState<PredictionItems[] | null>(null);
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  const { accessToken } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${ApiConfig.API_URL}api/users/filter`, {
        params: { page, limit, ...filters },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Greška pri učitavanju korisnika');
    }
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm('Da li ste sigurni da želite obrisati korisnika?')) return;
    try {
      await axios.delete(`${ApiConfig.API_URL}api/users/remove/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fetchUsers();
    } catch (err) {
      alert('Greška pri brisanju korisnika.');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    setPage(1);
    fetchUsers();
  };

  const handlePredictionClick = async (userId: number) => {
    try {
      setLoadingPredictions(true);
      const res = await axios.get(`${ApiConfig.API_URL}api/predictions/user/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedPredictions(res.data.predictionItems || []);
    } catch (err) {
      alert('Greška pri učitavanju predikcija korisnika.');
      console.error(err);
    } finally {
      setLoadingPredictions(false);
    }
  };

  return (
    <div className="user-table">
      <h2>📋 Upravljanje korisnicima</h2>

      <div className="filters">
        <input placeholder="Ime" name="firstName" value={filters.firstName} onChange={handleFilterChange} />
        <input placeholder="Prezime" name="lastName" value={filters.lastName} onChange={handleFilterChange} />
        <input placeholder="Email" name="email" value={filters.email} onChange={handleFilterChange} />
        <input placeholder="Tim" name="teamName" value={filters.teamName} onChange={handleFilterChange} />
        <button onClick={handleFilterSubmit}>Filtriraj</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Tim</th>
            <th>Verifikovan</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.teamName}</td>
              <td>{user.isVerified ? '✅' : '❌'}</td>
              <td>
                <button onClick={() => user.userId && handleDelete(user.userId)}>Obriši</button>
                <button onClick={() => setSelectedScores(user.scores || [])}>🏆 Score</button>
                <button onClick={() => user.userId && handlePredictionClick(user.userId)}>
                  📊 Predikcije
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Prethodna
        </button>
        <span>Strana {page}</span>
        <button onClick={() => setPage((prev) => (prev * limit < total ? prev + 1 : prev))} disabled={page * limit >= total}>
          Sledeća
        </button>
      </div>

      {loadingPredictions && <p>Učitavanje predikcija...</p>}

      {selectedPredictions && (
        <PredictionModal predictions={selectedPredictions} onClose={() => setSelectedPredictions(null)} />
      )}

      {selectedScores && (
        <ScoreModal scores={selectedScores} onClose={() => setSelectedScores(null)} />
      )}
    </div>
  );
};

export default UserManagementTable;

