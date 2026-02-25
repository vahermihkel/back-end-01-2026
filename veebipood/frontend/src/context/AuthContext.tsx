import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Person } from "../models/Person";
import { Role } from "../models/Role";

export const AuthContext = createContext({
  loading: false,
  person: {
    firstName: "",
    lastName: "",
    email: "",
    role: "CUSTOMER" as Role
  },
  isLoggedIn: false,
  login: (_token: string) => {},
  logout: () => {},
  setPerson: (_person: Person) => {} 
});

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [person, setPerson] = useState<Person>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "CUSTOMER"
  });
  const navigate = useNavigate();

  const getPerson = async() => {
    if (sessionStorage.getItem("token") === null) {
      setLoading(false);
      return;
    }
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/profile", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    });
    if (res.status === 403) {
      setLoading(false);
      return;
    }
    const json = await res.json();
    if (json.id > 0) {
      setPerson(json);
      setIsLoggedIn(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPerson();
  }, []);

  const login = (token: string) => {
    setIsLoggedIn(true);
    sessionStorage.setItem("token", token);
    navigate("/profile");
    getPerson();
  }

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{loading, person, setPerson, isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}