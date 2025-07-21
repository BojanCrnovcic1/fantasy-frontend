import { useState, useEffect } from 'react';
import './actualStandings.scss';
import type { ActualStandings } from '../../../types/ActualStandings';
import { ApiConfig } from '../../../config/ApiConfig';
import { format } from 'date-fns';
import axios from 'axios';

const ActualStanding = () => {
    const [standings, setStandings] = useState<ActualStandings[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ActualStandings[]>(ApiConfig.API_URL + 'api/standings/2025');
                
                if (!response.data) {
                    throw new Error('Failed to fetch standings data');
                }
                
                setStandings(response.data);
                
                // Pronađi najnoviji datum ažuriranja
                if (response.data.length > 0) {
                    const latestUpdate = new Date(Math.max(...response.data.map((s: ActualStandings) => 
                        new Date(s.updateAt).getTime()
                    )));
                    setLastUpdated(latestUpdate);
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) {
        return (
            <div className="standings-loading">
                <div className="spinner"></div>
                <p>Učitavanje tabele...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="standings-error">
                <p>Došlo je do greške: {error}</p>
                <button onClick={() => window.location.reload()}>Pokušaj ponovo</button>
            </div>
        );
    }

    return (
        <div className="premier-league-standings">
            <div className="standings-header">
                <h2>Engleska Premijer Liga - Trenutna tabela</h2>
                {lastUpdated && (
                    <p className="last-updated">
                        Poslednje ažuriranje: {format(lastUpdated, 'dd.MM.yyyy HH:mm')}
                    </p>
                )}
            </div>
            
            <div className="standings-table-container">
                <table className="standings-table">
                    <thead>
                        <tr>
                            <th>Poz.</th>
                            <th>Tim</th>
                            <th>Ime</th>
                            <th>Poslednje ažuriranje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((standing) => (
                            <tr key={standing.actualStandingId}>
                                <td>{standing.position}</td>
                                <td className="team-cell">
                                    {standing.team?.logoUrl && (
                                        <img 
                                            src={standing.team.logoUrl} 
                                            alt={standing.team.name} 
                                            className="team-logo" 
                                        />
                                    )}
                                    <span>{standing.team?.shortName || 'Nepoznat tim'}</span>
                                </td>
                                <td>{standing.team.name}</td>
                                <td>{standing.updateAt ? format(new Date(standing.updateAt), 'dd.MM.yyyy') : 'Nepoznato'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActualStanding;