import { useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [messageError, setMessageError] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const doLogin = async () => {
        setEmailError(false);
        setPasswordError(false);
        setMessageError("");

        try {
            await login(email, password);
            
        } catch (error) {
            console.error('Login failed:', error);

            if (!email) {
                setEmailError(true);
            }
            if (!password) {
                setPasswordError(true);
            }

            setMessageError('Prijava nije uspijela. Molimo vas provjerite vase akreditive.');
        }
    }

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className='login'>
            <button className="archive-back-button" onClick={handleBackClick}>
               &larr; Nazad
            </button>
            <div className='login-card'>
                <h1>Prijava</h1>
                <form>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={emailError ? 'error-border' : ''}
                    />
                    {emailError && <div className="error">Email je obavezan</div>}

                    <label htmlFor='password'>Lozinka: </label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={passwordError ? 'error-border' : ''}
                    />
                    {passwordError && <div className="error">Lozinka je obavezna.</div>}

                    <button type='button' onClick={doLogin}>Prijava</button>
                    {messageError && <div className="error">{messageError}</div>}
                </form>
                <div className='register-back'>
                    <span>Nemate nalog? Brzo i lagano se registrujte</span>
                    <Link to={'/register'}>
                        <p>Klikom ovde...</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;