import { request, response } from "express";
import axios from "axios";
export const sendOtp = (req, res) => {
  console.log(req.query);
  axios
    .post(
      "https://test.apnagodam.com/api/v1_apna_send_otp",

      {
        withCredentials: true,
      },
      {
        params: {
          number: req.query.empId,
          app_type: "Emp",
        },
      }
    )
    .then(function (response) {
      return res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.json({
        error: error,
      });
    });
};

export const verifyOtp = (req, res) => {
  console.log(req.query);
  axios
    .post(
      `https://test.apnagodam.com/api/v1_apna_emp_verify_otp?number=${req.query.empId}&otp=${req.query.otp}&app_type=Emp`,
      {
        withCredentials: true,
      },
      {
        params: {
          number: req.query.empId,
          otp: req.query.otp,
          app_type: "Emp",
        },
      }
    )
    .then(function (response) {
      return res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return res.json({
        error: error,
      });
    });
};
