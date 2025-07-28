import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import './myPrediction.scss';
import axios from 'axios';
import { ApiConfig } from '../../../config/ApiConfig';
import type { PredictionItems } from '../../../types/PredictionsItems';

const MyPredicition: React.FC = () => {
    const [predictions, setPredictions] = useState<PredictionItems[]>([]);
    const { accessToken, user } = useAuth();
    const userId = user?.userId;

    useEffect(() => {
        if (userId) {
            fetchPredictions();
        }
    }, [userId]);
    

    const fetchPredictions = async () => {
        if (!userId) return;
        try {
            const response = await axios.get(ApiConfig.API_URL + `api/predictions/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setPredictions(response.data?.predictionItems || []);
        } catch (error) {
            console.error('Greška kod dohvaćanja predikcije. ', error)
        }
    }
  return (
    <div className='my-predictions'>
        <h3>📊 Moja predikcija</h3>
        {predictions.length > 0 ? (
          <ul>
          {predictions.map((item, index) => {
            const position = item.position;
            let className = '';
        
            if (position === 1) className = 'champion';
            else if (position >= 1 && position <= 4) className = 'ucl';
            else if (position >= 5 && position <= 7) className = 'europe';
            else if (position >= 18) className = 'relegation';
        
            return (
              <li key={index} className={className}>
                <strong>{position}.</strong> {item.team?.name || `Tim ID ${item.teamId}`}
                {item.team?.logoUrl && <img src={item.team.logoUrl} alt={item.team.name} />}
              </li>
            );
          })}
        </ul>        
        ) : (
          <p>Korisnik nema napravljenu predikciju.</p>
        )}
    </div>
  )
}

export default MyPredicition;