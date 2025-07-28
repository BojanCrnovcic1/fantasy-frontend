import { ChevronDown, ChevronUp, Text, Menu, Banana, Table2Icon, TableOfContents, DeleteIcon } from 'lucide-react';
import React, { useState } from 'react';
import './sideBar.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface AdminSideBarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<AdminSideBarProps> = ({ collapsed, setCollapsed}) => {
    const [showPredictions, setShowPredictions] = useState<boolean>(false);
    const [showTable, setShowTables] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showRules, setShowRules] = useState<boolean>(false);
    const {logout, user} = useAuth();

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
            <h2>{user?.teamName}</h2>
            <button onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => setShowPredictions(!showPredictions)}>
            <span>Predikcija</span>
          </div>
          {showPredictions && (
            <div className="submenu">
              <Link to="newPrediction">
                <Table2Icon size={18} /> Predvidi tabelu
              </Link>
              <Link to="myPrediction">
                <TableOfContents size={18} /> Moja predikcija
              </Link>
            </div>
          )}

          <div className="nav-item" onClick={() => setShowTables(!showTable)}>
            <span>Tabele</span>
          </div>
          {showTable && (
            <div className="submenu">
              <Link to="table">
                <Table2Icon size={18} /> Tabela
              </Link>
              <Link to="worstTable">
                <Banana size={18} /> Najveći obožavatelj "banane"
              </Link>
            </div>
          )}

          <div className="nav-item" onClick={() => setShowUsers(!showUsers)}>
            <span>Korisnik</span>
          </div>
          {showUsers && (
            <div className="submenu">
              <Link to="delete-acc">
                <DeleteIcon size={18} /> Izbriši nalog
              </Link>
            </div>
          )}

          <div className="nav-item" onClick={() => setShowRules(!showRules)}>
            <span>Pravila</span>
          </div>
          {showRules && (
            <div className="submenu">
              <Link to="scoresRules">
                <Text size={18} /> Bodovanje
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

export default SideBar
