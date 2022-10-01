import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setUser({
      username: "Arun Joseph",
      email: "arunjoseph3007@gmail.com",
      photoUrl: "https://placeimg.com/80/80/people",
    });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);
