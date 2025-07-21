import React from 'react';
import './modal.scss';
import type { PredictionItems } from '../../types/PredictionsItems';

interface Props {
  predictions: PredictionItems[];
  onClose: () => void;
}

const PredictionModal: React.FC<Props> = ({ predictions, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>📊 Pregled predikcija</h3>
        <button className="close-btn" onClick={onClose}>Zatvori</button>

        {predictions.length > 0 ? (
          <ul>
            {predictions.map((item, index) => (
              <li key={index}>
                <strong>Pozicija {item.position}:</strong> {item.team?.name || `Tim ID ${item.teamId}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>Korisnik nema predikcija.</p>
        )}
      </div>
    </div>
  );
};

export default PredictionModal;


