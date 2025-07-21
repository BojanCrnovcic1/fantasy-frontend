import axios from 'axios';
import  { useState } from 'react'
import { ApiConfig } from '../../config/ApiConfig';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';

interface RegisterProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
}

const Register = () => {
    const [teamName, setTeamName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const navigate = useNavigate();


    const doRegister = async () => {
      if (!email || !password || !teamName || !firstName || !lastName) {
          return setErrorMessage('Molimo vas da popunite obavezna polja.');
      }
  
      const payload: any = {
          teamName,
          firstName,
          lastName,
          email,
          password,
      };
  
      try {
          const response = await axios.post<RegisterProps>(ApiConfig.API_URL + 'auth/register', payload);
          if (response.status !== 201) {
              return response.statusText;

          } else {

              setSuccessMessage("Registracija je uspešno obavljena! Potvrdite svoj nalog putem mejla kako biste mogli da što pre započnete vasu igru.");
              setTimeout(() => {
                navigate('/login');
              }, 8000); 
          }
      } catch (error) {
          setErrorMessage('Greška prilikom registracije. Molimo Vas pokušajte ponovo.');
      }
  };

  const handleBackClick = () => {
    navigate('/');
  }; 
  
  return (
    <div className='register'>
        <button className="archive-back-button" onClick={handleBackClick}>
            &larr; Nazad
        </button>
        <div className='register-card'>
            <h1>Registracija</h1>
            <form>
                <label htmlFor='teamName'>Ime tima: </label>
                <input type='text' id='teamName' name='teamName'  value={teamName}
                        onChange={(e) => setTeamName(e.target.value)} />
                <label htmlFor='firstName'>Ime: </label>
                <input type='text' id='firstName' name='firstName'  value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor='lastName'>Prezime: </label>
                <input type='text' id='lastName' name='lastName'  value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor='email'>Email: </label>
                <input type='email' id='email' name='email'  value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='password'>Lozinka: </label>
                <input type='password' id='password' name='password'  value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                <button type='button' onClick={doRegister}>Register</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='register-back'>
                <span>Da li ste vec registrovani?</span>
                <Link to={'/login'}>
                    <p>Prijavite se ovde...</p>
                </Link>
            </div>
        </div>
        {successMessage && (
          <div className="overlay-success">
            <div className="overlay-content">
                <h2>{successMessage}</h2>
            </div>
           </div>
        )}
    </div>
  )
}

export default Register;
