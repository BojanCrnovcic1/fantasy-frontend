import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './misc/ProtectedRoute'
import Admin from './pages/admin/Admin'
import Profile from './pages/profile/Profile'
import UpdatePosition from './components/admin/updatePosition/UpdatePosition'
import ActualStanding from './components/admin/actualStandings/ActualStandings'
import AdminStandingsManager from './components/admin/adminStandingsManager/AdminStandingsManager'
import UserManagementTable from './components/admin/userManagemetTable/UserManagemetTable'
import DeleteUser from './components/user/deleteUser/DeleteUser'
import CreatePrediction from './components/user/createPrediciton/CreatePrediction'
import Table from './components/user/table/Table'
import WorstTable from './components/user/table/WorstTable'
import ScoringRules from './components/user/scoringRules/ScoringRules'
import LandingPage from './pages/landing/LandingPage'
import MyPredicition from './components/user/myPredicition/MyPredicition'

const App = () => {
  const {accessToken, user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role) {
    if (accessToken && user.role === 'ADMIN' && !window.location.pathname.startsWith('/adminPanel')) {
      navigate('/adminPanel');
    }
    if (accessToken && user.role === 'USER' && !window.location.pathname.startsWith('/dashbourd')) {
      navigate('/dashbourd')
    }
  }
  }, [accessToken, user?.role, navigate]);

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      <Route path='/adminPanel/' element={<ProtectedRoute allowedRoles={['ADMIN']}><Admin /></ProtectedRoute>
      }>
        <Route path='teams' element={<ActualStanding />} />
        <Route path='uploads' element={<UpdatePosition />} />
        <Route path='menagers' element={<AdminStandingsManager />} />
        <Route path='usersTable' element={<UserManagementTable />} />
      </Route>

      <Route path='/dashbourd' element={<ProtectedRoute allowedRoles={['USER']}><Profile /></ProtectedRoute>
      }>
        <Route path='newPrediction' element={<CreatePrediction />} />
        <Route path='myPrediction' element={<MyPredicition />} />
        <Route path='table' element={<Table />} />
        <Route path='worstTable' element={<WorstTable />} />
        <Route path='delete-acc' element={<DeleteUser />} />
        <Route path='scoresRules' element={<ScoringRules />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App