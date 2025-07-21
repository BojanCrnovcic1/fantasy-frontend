import { useAuth } from '../../../context/AuthContext'
import axios from 'axios';
import './deleteUser.scss';
import { ApiConfig } from '../../../config/ApiConfig';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
    const { accessToken, user } = useAuth();
    const navigate = useNavigate();
    const userId = user?.userId;

    const handleDeleteUser = async () => {
        if (!window.confirm('Da li ste sigurni da želite obrisati vaš nalog?')) return;
        try {
            await axios.delete(ApiConfig.API_URL + `api/users/remove/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            navigate('/login');
        } catch (error) {
            console.error('Greška kod brisanja korisnika: ', error)
        }
    }
  return (
    <div className='delete-container'>
        <h1>Obrišite Vas nalog</h1>
        <div className='delete-content'>
            <p>Žao nam je sto ste odlučili da napustite igru. Da li ste sigurni?</p>
            <button onClick={handleDeleteUser}>Obriši nalog</button>
        </div>
    </div>
  )
}

export default DeleteUser