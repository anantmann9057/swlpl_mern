import Header from "../components/Header";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function Profile(){

    const auth = localStorage.getItem("token");
    useEffect(() => {
        if (auth) {
            axios
            .post(import.meta.env.VITE_SERVER_BASE_URL+"/auth/profile", {
              authToken: localStorage.getItem("token"),
            })
            .then((response) => {
              if (response.data.status == "3") {
                localStorage.clear();
              }
           
            });
          
        }
      }, []);
    
    return (<div>
        <Header></Header>
        <h1></h1>
    </div>);
}