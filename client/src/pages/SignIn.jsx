import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import { toast, ToastContainer } from "react-toastify";
import "../styles/login.css";
import logo from "../assets/logo.png";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [isOtpSent, setSentOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [token, setToken] = useState("");

  const [empId, setEmpId] = useState("");

  const handleSubmit = () => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  function sendOtp() {
    setOpen(true);
    axios
      .post(
        import.meta.env.VITE_SERVER_BASE_URL + `/auth/sendOtp?empId=${empId}`
      )
      .then(function (response) {
        setOpen(false);

        if (response.data.status == "1") {
          setSentOtp(true);
          setEmpId(response.data.phone);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
      });
  }
  function verifyOtp() {
    setOpen(true);

    axios
      .post(
        import.meta.env.VITE_SERVER_BASE_URL +
          `/auth/verifyOtp?empId=${empId}&otp=${otp}`
      )
      .then(function (response) {
        setOpen(false);

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
        setOpen(false);
      });
  }
  const validateInputs = () => {
    const email = document.getElementById("email");
    // const password = document.getElementById('password');

    let isValid = true;

    if (!email.value) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid employee id.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // if (!password.value || password.value.length < 6) {
    //   setPasswordError(true);
    //   setPasswordErrorMessage('Password must be at least 6 characters long.');
    //   isValid = false;
    // } else {
    //   setPasswordError(false);
    //   setPasswordErrorMessage('');
    // }

    return isValid;
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          {isOtpSent ? (
            <div
              className="container-fluid 2-100"
              style={{
                alignContent: "center",
              }}
            >
            <img src={logo} className="w-100" />
              <h3 className="body mt-2 mb-2">Enter OTP</h3>
              <MuiOtpInput
                length={6}
                value={otp}
                className="mt-2 mb-2"
                onChange={(orp) => {
                  setOtp(orp);

                  console.log(orp);
                }}
              />
              <p className="mt-2 mb-2" style={{
                fontSize:"12px"
              }}>
                Otp has been sent to your mobile please input to login
              </p>

              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  if (otp.length === 6) {
                    verifyOtp(otp);
                  } else {
                    toast("please enter valid otp");
                  }
                  navigate("/");
                }}
              >
                Login
              </Button>
            </div>
          ) : (
            <>
            <img src={logo} />
              <Typography
                component="h1"
                variant="body"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Employee Login
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl>
                  <FormLabel htmlFor="text">Employee Id</FormLabel>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    name="employee id"
                    placeholder="AG0XXX"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined" 
                    onChange={(e) => {
                      setEmpId(e.target.value);
                    }}
                    color={emailError ? "error" : "primary"}
                  />
                </FormControl>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(e) => {
                  if (validateInputs) {
                    e.preventDefault();
                    sendOtp(empId);
                  }
                }}
              >
                Sign in
              </Button>
            </>
          )}

          <Divider></Divider>
        </Card>
      </SignInContainer>
    </>
  );
}
