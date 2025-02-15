import React from 'react';
    import { NavLink } from 'react-router-dom';
    import { FiLogOut, FiGrid, FiPackage, FiSettings, FiTrendingUp } from 'react-icons/fi';
    import { useContext } from 'react';
    import { SupabaseContext } from '../contexts/SupabaseContext';
    import { useNavigate } from 'react-router-dom';

    function Inventory() {
      const { supabase, session } = useContext(SupabaseContext);
      const navigate = useNavigate();

      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error logging out:", error);
        } else {
          navigate('/login');
        }
      };

      if (!session) {
        return <div>Loading...</div>; // Or redirect to login
      }

      const initials = session.user.email
        .split('@')[0]
        .split('')
        .filter((char) => char.match(/[a-zA-Z]/))
        .slice(0, 2)
        .join('')
        .toUpperCase();

              // Helper function for date
        const formatDate = () => {
            return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            });
        };

      return (
        <div className="app-container">
          <aside className="sidebar">
            <div className="sidebar-nav">
              <ul>
                <li>
                  <NavLink to="/dashboard" activeClassName="active">
                    <FiGrid style={{ marginRight: '0.5rem' }} />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inventory" activeClassName="active">
                    <FiPackage style={{ marginRight: '0.5rem' }} />
                    Inventory
                  </NavLink>
                </li>
                <li>
                    <NavLink to="/transactions" activeClassName="active">
                        <FiTrendingUp style={{ marginRight: '0.5rem' }} />
                        Transactions
                    </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" activeClassName="active">
                    <FiSettings style={{ marginRight: '0.5rem' }} />
                    Settings
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">{initials}</div>
              <div className="sidebar-user-email">{session.user.email}</div>
              <button className="logout-button" onClick={handleLogout}>
                <FiLogOut style={{ marginRight: '0.5rem' }} />
                Sign Out
              </button>
            </div>
          </aside>
          <main className="main-content">
            <div className="top-bar">
                <div className="top-bar-title">Financial Management System</div>
                <div className="top-bar-right">
                    <div className="top-bar-fullscreen">
                        {/* Placeholder for fullscreen toggle */}
                        <FiTrendingUp />
                    </div>
                    <div className="top-bar-date">{formatDate()}</div>
                </div>
            </div>
            <div className="dashboard-content">
                <h1>Inventory</h1>
                {/* Inventory content */}
            </div>
          </main>
        </div>
      );
    }

    export default Inventory;
