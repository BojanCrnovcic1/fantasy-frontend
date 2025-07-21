import { useState } from 'react'
import AdminSideBar from '../../components/admin/adminSideBar/AdminSideBar';
import './admin.scss';
import { Outlet } from 'react-router-dom';

const Admin = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false); 

  return (
    <div className={`admin-dashbourd ${collapsed ? 'collapsed' : ''}`}>
      <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className='admin-container'>
        <div className='admin-contant'>
          <h1>Administrator Panel</h1>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;