import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AppAppBar from "../components/AppBar";
import "../styles/profile.css";
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
          }
        })
        .catch((e) => {
          setOpen(false);
        });
    } else {
      navigate("/login");
    }
  }, []);
  function Example() {
    return (
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 align-content: center;">
              <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {JSON.parse(localStorage.getItem("user")).first_name +
                  " " +
                  JSON.parse(localStorage.getItem("user")).last_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Employee Code
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {JSON.parse(localStorage.getItem("user")).emp_id}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Mobile No.
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {JSON.parse(localStorage.getItem("user")).personal_phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Designation
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {JSON.parse(localStorage.getItem("user")).designation}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  }
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
      <img
        className="container-fluid  w-100"
        src={
          "https://apnagodam.com/resources/assets/upload/employees/" +
          JSON.parse(localStorage.getItem("user")).passport_image
        }
        style={{
          objectFit: "contain",
          maxHeight: "50vh",
        }}
      ></img>

      <Example></Example>
    </div>
  );
}
