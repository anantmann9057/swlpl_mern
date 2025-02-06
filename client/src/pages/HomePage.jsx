import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoginPage from "./LoginPage";
import axios from "axios";
import Dashboard from "./Dashboard";

export default function HomePage() {
  const [isLogin, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const auth = localStorage.getItem("token");
  const [user, setUser] = useState({});
  useEffect(() => {
    if (auth) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
      setLogin(true);
     
    }
  }, []);
  return (
    <div>
      {isLogin ? (
      <Dashboard></Dashboard>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
