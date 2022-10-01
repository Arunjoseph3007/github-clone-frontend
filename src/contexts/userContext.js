import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setUser({
      userName: "Arun Joseph",
      firstName: "Arun",
      lastName: "Joseph",
      email: "arunjoseph3007@gmail.com",
      photoUrl: "https://placeimg.com/200/200/people",
      userId: localStorage.getItem("user_id"),
    });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);
