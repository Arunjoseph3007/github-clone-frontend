import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("post url", { email, password });
      
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
    userName,
  }) => {
    try {
      
    } catch (error) {
      
    }
  };

  const logout = async () => [];

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
    <AuthContext.Provider
      value={{ user, setUser, loading, error, register, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);
