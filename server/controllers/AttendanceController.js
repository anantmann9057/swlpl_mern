import axios from "axios";
export const checkAttendance = (req, res) => {
  console.log(req.query);
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      "https://test.apnagodam.com/emp_api/apna_emp_clock_status_new",
      null,
      {
        headers: headers,
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
export const markAttendance = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      "https://test.apnagodam.com/emp_api/apna_emp_clock_status_new",
      null,
      {
        headers: headers,
        data: {},
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
