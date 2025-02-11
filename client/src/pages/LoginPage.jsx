import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { Col, Row } from "react-bootstrap";

export default function LoginPage() {
  const navigate = useNavigate();

  const [isOtpSent, setSentOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [token, setToken] = useState("");

  const [empId, setEmpId] = useState("");
  function sendOtp() {
    axios
      .post(`https://swlpl-mern.onrender.com/auth/sendOtp?empId=${empId}`)
      .then(function (response) {
        if (response.data.status == "1") {
          setSentOtp(true);
          setEmpId(response.data.phone);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function verifyOtp() {
    axios
      .post(`https://swlpl-mern.onrender.com/auth/verifyOtp?empId=${empId}&otp=${otp}`)
      .then(function (response) {
        if (response.data.status == "1") {
          setSentOtp(true);
          localStorage.setItem("token", response.data.Authorization);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user_details)
          );
          setToken(response.data.Authorization);
          window.location.reload();
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div
      className="container "
      style={{
        height: "100vh",
        alignContent: "center",
      }}
    >
      {isOtpSent ? (
        <div
          className="container-fluid 2-100"
          style={{
            alignContent: "center",
          }}
        >
          <h3>Enter OTP</h3>
          <MuiOtpInput
            length={6}
            value={otp}
            onChange={(orp) => {
              setOtp(orp);
              if (otp.length === 6) {
                verifyOtp(orp);
              }
              console.log(orp);
            }}
          />
          <p className="m-2">
            Otp has been sent to your mobile please input to login
          </p>

          <Button
            variant="primary"
            onClick={() => {
              verifyOtp(otp);
              navigate("/");
            }}
          >
            Login
          </Button>
        </div>
      ) : (
        <Row>
          <Col>
            <Card
              elevation={3}
              className="p-4 m-0"
              style={{
                height: "50vh",
              }}
            >
              <form
                className="form-group m-2 p-2 w-100"
                style={{
                  height: "150px",
                }}
              >
                <h2>Login</h2>
                <div
                  style={{
                    alignContent: "center",
                  }}
                >
                  <label
                    htmlFor="exampleInputEmail1"
                    className="w-100"
                    style={{
                      textAlign: "start",
                    }}
                  >
                    Employee Code
                  </label>
                  <input
                    className="form-control mt-2 w-100"
                    id="empId"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEmpId(e.target.value);
                    }}
                    aria-describedby="emailHelp"
                    placeholder="Enter Employee Code"
                  ></input>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-10"
                  onClick={(e) => {
                    e.preventDefault();
                    sendOtp(empId);
                  }}
                >
                  send OTP
                </button>
              </form>
            </Card>
          </Col>
          <Col
            style={{
              alignContent: "center",
              color: "white",
              backgroundColor: "#157173",
            }}
          >
            <h1>SWLPL Login</h1>
          </Col>
        </Row>
      )}
    </div>
  );
}
