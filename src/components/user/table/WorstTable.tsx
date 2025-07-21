import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './worstTable.scss';
import type { Users } from '../../../types/Users';
import { ApiConfig } from '../../../config/ApiConfig';
import { useAuth } from '../../../context/AuthContext';

const WorstTable: React.FC = () => {
  const [worstUsers, setWorstUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchWorstUsers = async () => {
      try {
        const response = await axios.get<Users[]>(ApiConfig.API_URL + `api/scores/${currentYear}/worst`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        setWorstUsers(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju najgorih korisnika:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorstUsers();
  }, [currentYear]);

  if (loading) return <div className="worst-table"><p>Učitavanje...</p></div>;

  return (
    <div className="worst-table">
      <h2>Najveći kitoljub...</h2>
      {worstUsers.length === 0 ? (
        <p>Nema korisnika sa najgorim rezultatom.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>Prezime</th>
            </tr>
          </thead>
          <tbody>
            {worstUsers.map((user, index) => (
              <tr key={`${user.firstName}-${user.lastName}-${index}`}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorstTable;

