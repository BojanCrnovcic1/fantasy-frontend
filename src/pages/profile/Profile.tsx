import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/user/sideBar/SideBar';
import './profile.scss';

const Profile = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    
  return (
    <div className={`profile ${collapsed ? 'collapsed' : ''}`}>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className='profile-container'>
        <div className='profile-contant'>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;