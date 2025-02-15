import React, { createContext, useState, useEffect } from 'react';
    import { createClient } from '@supabase/supabase-js';

    const SupabaseContext = createContext(null);

    const SupabaseProvider = ({ children }) => {
      const [supabase] = useState(
        createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        )
      );
      const [session, setSession] = useState(null);

      useEffect(() => {
        const fetchSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
        }

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });

        return () => subscription?.unsubscribe();
      }, [supabase]);

      return (
        <SupabaseContext.Provider value={{ supabase, session }}>
          {children}
        </SupabaseContext.Provider>
      );
    };

    export { SupabaseContext, SupabaseProvider };
