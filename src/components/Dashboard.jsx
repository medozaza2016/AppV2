import React, { useContext } from 'react';
    import { SupabaseContext } from '../contexts/SupabaseContext';
    import { useNavigate, NavLink } from 'react-router-dom';
    import { FiLogOut, FiGrid, FiPackage, FiSettings, FiDollarSign, FiTrendingUp, FiBarChart2, FiCreditCard, FiBriefcase, FiBox } from 'react-icons/fi'; // Import icons

    function Dashboard() {
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

      // Get user's initials for the avatar
      const initials = session.user.email
        .split('@')[0]
        .split('')
        .filter((char) => char.match(/[a-zA-Z]/))
        .slice(0, 2)
        .join('')
        .toUpperCase();

        // Helper function to format currency
        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', // Change to your desired currency
            }).format(value);
        };

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
                        <FiBarChart2 />
                    </div>
                    <div className="top-bar-date">{formatDate()}</div>
                </div>
            </div>
            <div className="dashboard-content">
              <h1>Dashboard</h1>
              <div className="dashboard-grid">
                <div className="card">
                  <FiTrendingUp className="card-icon" />
                  <div className="card-title">Overall Money Flow</div>
                  <div className="card-subtitle">
                    <div>AED 381,575.80</div>
                    <div>USD 103,971.608</div>
                  </div>

                </div>
                <div className="card">
                  <FiDollarSign className="card-icon" />
                  <div className="card-title">Capital</div>
                  <div className="card-subtitle">Total Capital</div>
                  <div className="card-value">
                    {formatCurrency(317880.80)}
                    <div className="card-subvalue">USD 86,616.022</div>
                    </div>
                </div>
                <div className="card">
                  <FiBarChart2 className="card-icon" />
                  <div className="card-title">Contribution</div>
                    <div className="card-subtitle">Total Contribution</div>

                  <div className="card-value">
                    {formatCurrency(232248.50)}
                    <div className="card-subvalue">USD 63,282.97</div>
                    </div>
                </div>
                <div className="card">
                  <FiCreditCard className="card-icon" />
                  <div className="card-title">Bank Balance</div>
                  <div className="card-subtitle">Cash on Hand</div>
                  <div className="card-value">
                    {formatCurrency(0)}
                    <div className="card-subvalue">USD 0.00</div>
                    </div>
                </div>
                <div className="card">
                  <FiBriefcase className="card-icon" />
                  <div className="card-title">Loans</div>
                    <div className="card-subtitle">Showroom Balance</div>
                  <div className="card-value">
                    {formatCurrency(20355.00)}
                    <div className="card-subvalue">USD 5,546.322</div>
                    </div>
                </div>
                <div className="card">
                  <FiTrendingUp className="card-icon" />
                  <div className="card-title">Expenses</div>
                    <div className="card-subtitle">Total Expenses</div>
                  <div className="card-value">
                    {formatCurrency(101790.00)}
                    <div className="card-subvalue">USD 27,735.695</div>
                    </div>
                </div>
                <div className="card">
                  <FiDollarSign className="card-icon" />
                  <div className="card-title">Profit Distribution</div>
                    <div className="card-subtitle">NADA</div>
                  <div className="card-value">
                    {formatCurrency(51126.70)}
                    <div className="card-subvalue">USD 13,930.381</div>
                    </div>
                </div>
                <div className="card">
                  <FiBox className="card-icon" />
                  <div className="card-title">Inventory</div>
                    <div className="card-subtitle">Total Value</div>
                  <div className="card-value">
                    {formatCurrency(185410.00)}
                    <div className="card-subvalue">USD 50,520.436</div>
                    </div>
                </div>
                {/* Add more cards as needed */}
              </div>
            </div>
          </main>
        </div>
      );
    }

    export default Dashboard;
