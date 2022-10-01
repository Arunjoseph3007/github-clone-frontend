import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setUser({
      userName: "Arun Joseph",
      firstName: "Arun",
      lastName: "Joseph",
      email: "arunjoseph3007@gmail.com",
      photoUrl: "https://placeimg.com/200/200/people",
    });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user && children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);
