import React from 'react';
import './modal.scss';
import type { Scores } from '../../types/Scores';

interface Props {
  scores: Scores[] | null;
  onClose: () => void;
}

const ScoreModal: React.FC<Props> = ({ scores, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>🏆 Pregled score-a</h3>
        <button className="close-btn" onClick={onClose}>Zatvori</button>
        {scores?.length ? (
          <ul>
            {scores.map((score, index) => (
              <li key={index}>
                 Bodovi: {score.totalScore} — Datum: {score.calculatedAt ? new Date(score.calculatedAt).toLocaleDateString() : "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          <p>Korisnik nema bodova.</p>
        )}
      </div>
    </div>
  );
};

export default ScoreModal;
