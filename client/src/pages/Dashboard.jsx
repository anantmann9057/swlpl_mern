import { Col, Row } from "react-bootstrap";
import AttendanceCard from "../components/AttendanceCard";
import CaseIdCard from "../components/CaseIdCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
export default function Dashboard() {
  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (auth) {
     
      axios
        .post("https://swlpl-mern.onrender.com/cases/caseRequests", {
          authToken: localStorage.getItem("token"),
        })
        .then((response) => {
          if (response.data.status == "3") {
            localStorage.clear();
          }
          toast(response.data.status.message);
    
          console.log(response);
        });
    }
  }, []);

  return (
    <>
    <ToastContainer></ToastContainer>
      <Header />
      <Row className="container-fluid">
        <Col>
          <CaseIdCard title="Inwards" header="Inwards" />
        </Col>
        <Col>
          <CaseIdCard title="Outwards" header="Outwards" />
        </Col>
      </Row>
    </>
  );
}
