import Header from "../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();

  const auth = localStorage.getItem("token");
  useEffect(() => {
    if (auth) {
      axios
        .post(import.meta.env.VITE_SERVER_BASE_URL + "/auth/profile", {
          authToken: auth,
        })
        .then((response) => {
          if (response.data.status == "3") {
            localStorage.clear();
            navigate('/login');

          }
          toast(response.data.message);
        });
    }
  }, []);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Header></Header>
      <h1></h1>
    </div>
  );
}
