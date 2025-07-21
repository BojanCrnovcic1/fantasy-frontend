import React from 'react';
import './scoringRules.scss';

const ScoringRules: React.FC = () => {
  return (
    <div className="scoring-rules">
      <h2>📊 Pravila Bodovanja</h2>

      <section className="rules-section fade-in">
        <h3>1. Osnovni bodovi</h3>
        <p>Ako tačno pogodiš poziciju tima na tabeli, dobijaš <strong>10 bodova</strong>.</p>
        <ul>
          <li>Promašaj za 1 mjesto (gore/dole): <strong>5 bodova</strong></li>
          <li>Promašaj za 2 mjesta: <strong>3 boda</strong></li>
          <li>Promašaj za 3 mjesta: <strong>1 bod</strong></li>
          <li>Promašaj za više od 3 mjesta: <strong>0 bodova (KURČINA bodovi 🍌)</strong></li>
        </ul>
      </section>

      <section className="rules-section fade-in">
        <h3>2. Bonus bodovi</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Kategorija</th>
                <th>Uslov</th>
                <th>Bonus po timu</th>
                <th>Maks. bonus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prvo mjesto</td>
                <td>Tačan prvak</td>
                <td>+20</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Top 4</td>
                <td>Tim u predviđenom top 4</td>
                <td>+8</td>
                <td>32 (4×8)</td>
              </tr>
              <tr>
                <td>Pozicije 5-7</td>
                <td>Tim u predviđenom 5-7</td>
                <td>+7</td>
                <td>21 (3×7)</td>
              </tr>
              <tr>
                <td>Posljednja 3</td>
                <td>Tim u zoni ispadanja</td>
                <td>+6</td>
                <td>18 (3×6)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rules-section fade-in">
        <h3>3. Primjer izračuna</h3>
        <p>
          Ako korisnik:
          <ul>
            <li>🎯 Tačno pogodi prvoplasiranog (+20)</li>
            <li>✅ Pogodi 3 od 4 tima u top 4 (3×8 = +24)</li>
            <li>✅ Pogodi 2 od 3 tima u 5-7 (2×7 = +14)</li>
            <li>✅ Pogodi 1 od 3 tima iz zone ispadanja (1×6 = +6)</li>
            <li>🧮 Ima 50 osnovnih bodova</li>
          </ul>
          <strong>Ukupno: 50 + 20 + 24 + 14 + 6 = 114 bodova</strong>
        </p>
      </section>

      <section className="rules-section fade-in">
        <h3>4. Napomene</h3>
        <ul>
          <li>⚠️ Bonus bodovi se <strong>ne preklapaju</strong> (npr. tim može biti samo u jednoj kategoriji - top 4, 5-7 ili bottom 3).</li>
          <li>🍌 Timovi koji promaše za više od 3 mjesta ulaze u <strong>BANANA tabelu</strong> — to je posebna lista najlošijih predikcija!</li>
        </ul>
      </section>
    </div>
  );
};

export default ScoringRules;
