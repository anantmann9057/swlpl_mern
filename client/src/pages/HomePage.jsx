import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoginPage from "./LoginPage";
import axios from "axios";
import Dashboard from "./Dashboard";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";

export default function HomePage() {
  const [isLogin, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const auth = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
      setLogin(true);
      toast("success")
    }
   
  }, []);
  return (
    <div>
      {isLogin ? (
      <Dashboard></Dashboard>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
