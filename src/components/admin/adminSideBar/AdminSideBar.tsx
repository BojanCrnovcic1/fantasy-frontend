import { ChevronDown, ChevronUp, Edit2, Menu, Table, Upload } from 'lucide-react';
import React, { useState } from 'react';
import './adminSideBar.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface AdminSideBarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ collapsed, setCollapsed}) => {
    const [showTeams, setShowTeams] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false)
    const {logout} = useAuth();

    const handleLogout = () => {
      logout();
    }
    
  return (
    <>
      <button  className="mobile-toggle" onClick={() => setCollapsed(false)}>
        <Menu size={24} /> .
      </button>

      { !collapsed && <div className="overlay" onClick={() => setCollapsed(true)}></div> }
      <div className={`sidebar ${collapsed ? 'collapsed' : 'open'}`}>
        <div className="sidebar-header">
            <h2>Admin</h2>
            <button onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
        </div>
        <nav className="sidebar-nav">
           <div className="nav-item" onClick={() => setShowTeams(!showTeams)}>
               <span>Timovi</span>
            </div>
            {showTeams && (
              <div className="submenu">
                <Link to="teams">
                  <Table size={18} /> Trenutna tabela
                </Link>
                <Link to="uploads">
                  <Upload size={18} /> Izmijena tabele
                </Link>
                <Link to="menagers">
                  <Edit2 size={18} /> Inicijalizacija i brisanje tabele 
                </Link>
            </div>
          )}
           <div className="nav-item" onClick={() => setShowUsers(!showUsers)}>
               <span>Korisnici</span>
            </div>
            {showUsers && (
              <div className="submenu">
                <Link to="usersTable">
                  <Table size={18} /> Tabela sa korisnicima
                </Link>
            </div>
          )}
        </nav>

        <button className="logout" type="button" onClick={handleLogout}>
          Odjavi se
        </button>
      </div>
    </>
  )
}

export default AdminSideBar