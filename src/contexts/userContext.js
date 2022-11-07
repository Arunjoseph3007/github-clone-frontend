import axios from "@/libs/axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      setUser(null);
      return;
    }

    try {
      const { data } = await axios.get("/accounts/MyUser/" + userId + "/");
      setUser({
        userName: data.username,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        photoUrl: process.env.NEXT_PUBLIC_API + data.profile_pic,
        userId: data.user_id,
      });
    } catch (e) {
      setUser(null);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`/accounts/login/`, { email, password });
      setUser(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user_id);

      toast.success("Login Successfull");

      refresh();

      return { ...res.data, success: true };
    } catch (error) {
      toast.error("Wrong Credentials");
      return { ...error, success: false };
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
      const res = await axios.post(`/accounts/register/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: userName,
        password: password,
      });

      // @ Sucessful
      if (res.data.username == userName) {
        setUser(res.data);
        toast.success("Verification Mail Sent.");
        return { ...res.data, success: true };
      }
      // @ Email exists aready
      else if (res.data.email) {
        toast.error("Email Already Registerd.");
        return { ...res.data, success: false };
      } else {
        toast.error(res.data.username);
        return { ...res.data, success: false };
      }
    } catch (error) {
      toast.error("Something went wrong");
      return { ...error, success: false };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    setUser(null);
  };

  useEffect(() => {
    setLoading(true)
    refresh();
    setLoading(false)
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
