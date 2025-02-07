import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [isOtpSent, setSentOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [token, setToken] = useState("");

  const [empId, setEmpId] = useState("");
  function sendOtp() {
    axios
      .post(`http://localhost:3000/auth/sendOtp?empId=${empId}`)
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
      .post(`http://localhost:3000/auth/verifyOtp?empId=${empId}&otp=${otp}`)
      .then(function (response) {
        if (response.data.status == "1") {
          setSentOtp(true);
          localStorage.setItem("token", response.data.Authorization);
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user_details)
          );
          setToken(response.data.Authorization);
          navigate("/");
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="container-fluid">
      {isOtpSent ? (
        <div className="container-fluid 2-100">
          <h3
            style={{
              textAlign: "start",
            }}
          >
            Enter OTP
          </h3>
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
        <form>
          <div className="form-group">
            <label
              for="exampleInputEmail1"
              className="w-100 m-2"
              style={{
                textAlign: "start",
              }}
            >
              Employee Code
            </label>
            <input
              className="form-control m-2"
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
            className="btn btn-primary m-2"
            onClick={(e) => {
              e.preventDefault();
              sendOtp(empId);
            }}
          >
            send OTP
          </button>
        </form>
      )}
    </div>
  );
}
