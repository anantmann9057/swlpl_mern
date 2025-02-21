import Header from "../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "react-bootstrap/Button";
import { Stack } from "@mui/material";
import AppAppBar from "../components/AppBar";
export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const auth = localStorage.getItem("token");

  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    if (auth) {
      setOpen(true);
      axios
        .post(import.meta.env.VITE_SERVER_BASE_URL + "/auth/profile", {
          authToken: auth,
        })
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            localStorage.clear();
            navigate("/login");
          }
          if (response.data.status == "1") {
            setProfileData(response.data.profile_data);
            toast(response.data.message);
          }
        })
        .catch((e) => {
          setOpen(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container-fluid m-0 p-0 w-100 mt-5">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer></ToastContainer>
      <AppAppBar />

      <Stack
        className="w-100"
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      >
        <img
          className="container rounded-circle  "
          src={
            "https://apnagodam.com/resources/assets/upload/employees/" +
            JSON.parse(localStorage.getItem("user")).passport_image
          }
          style={{
            objectFit: "cover",
            maxHeight: "100vh",
            maxWidth: "35%",
          }}
        ></img>
        <Stack
          className="w-100"
          direction={{ xs: "column", sm: "column", md: "col", lg: "col" }}
          spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        >
          <Button variant="light" className="container-fluid w-100 m-1">
            {JSON.parse(localStorage.getItem("user")).first_name}{" "}
            {JSON.parse(localStorage.getItem("user")).last_name}
          </Button>

          <Button variant="light" className="container-fluid w-100 m-1">
            {JSON.parse(localStorage.getItem("user")).emp_id}
          </Button>

          <Button variant="light" className="container-fluid w-100 m-1">
            {JSON.parse(localStorage.getItem("user")).personal_phone}
          </Button>

          <Button variant="light" className="container-fluid w-100 m-1">
            {JSON.parse(localStorage.getItem("user")).phone}
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
