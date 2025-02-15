import React, { useState, useContext } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { SupabaseContext } from '../contexts/SupabaseContext';
    import { FiLogIn } from 'react-icons/fi';

    function Login() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const navigate = useNavigate();
      const { supabase } = useContext(SupabaseContext);

      const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            setError(error.message);
          } else {
            navigate('/dashboard');
          }
        } catch (err) {
          setError("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="login-container">
          <div className="login-icon">
            <FiLogIn />
          </div>
          <h1>Sign in to your account</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="register-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      );
    }

    export default Login;
