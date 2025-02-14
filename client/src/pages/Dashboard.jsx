import { Col, Row } from "react-bootstrap";
import AttendanceCard from "../components/AttendanceCard";
import CaseIdCard from "../components/CaseIdCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
export default function Dashboard() {
  const auth = localStorage.getItem("token");
  const [inwardCases,setInwardCases] = useState([]);
  const [outwardCases,setOutwardCases] = useState([]);

  useEffect(() => {
    if (auth) {
     
      axios
        .post(import.meta.env.VITE_SERVER_BASE_URL+"/cases/caseRequests", {
          authToken: localStorage.getItem("token"),
        })
        .then((response) => {
          if (response.data.status == "3") {
            localStorage.clear();
          

          }
          setInwardCases(response.data.inward_request_data);
          setOutwardCases(response.data.outward_request_data);

         
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
          <CaseIdCard title="Inwards Requests" header="Inwards" cases={inwardCases.length} />
        </Col>
        <Col>
          <CaseIdCard title="Outwards Requests" header="Outwards" cases={outwardCases.length} />
        </Col>
      </Row>
    </>
  );
}
