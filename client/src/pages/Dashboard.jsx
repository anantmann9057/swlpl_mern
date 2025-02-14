import { Col, Row } from "react-bootstrap";
import AttendanceCard from "../components/AttendanceCard";
import CaseIdCard from "../components/CaseIdCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard() {
  const auth = localStorage.getItem("token");
  const [inwardCases, setInwardCases] = useState([]);
  const [outwardCases, setOutwardCases] = useState([]);
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  useEffect(() => {
    if (auth) {
      setOpen(true);
      axios
        .post(import.meta.env.VITE_SERVER_BASE_URL + "/cases/caseRequests", {
          authToken: localStorage.getItem("token"),
        })
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            localStorage.clear();
          } else if (response.data.status == "1") {
            setInwardCases(response.data.inward_request_data);
            setOutwardCases(response.data.outward_request_data);

            toast(response.data.status.message);
          }

          console.log(response);
        }).catch((e)=>{
          setOpen(false);

        });

    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
<CircularProgress color="inherit" />

      </Backdrop>
      <ToastContainer></ToastContainer>
      <Header />
      <Row className="container-fluid">
        <Col>
          <CaseIdCard
            title="Inwards Requests"
            header="Inwards"
            cases={inwardCases.length}
          />
        </Col>
        <Col>
          <CaseIdCard
            title="Outwards Requests"
            header="Outwards"
            cases={outwardCases.length}
          />
        </Col>
      </Row>
    </>
  );
}
