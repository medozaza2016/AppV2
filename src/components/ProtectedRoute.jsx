import React, { useContext } from 'react';
    import { Navigate } from 'react-router-dom';
    import { SupabaseContext } from '../contexts/SupabaseContext';

    function ProtectedRoute({ children }) {
      const { session } = useContext(SupabaseContext);

      if (!session) {
        // Redirect them to the /login page
        return <Navigate to="/login" replace />;
      }

      return children;
    }
    export default ProtectedRoute;
