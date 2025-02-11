import axios from "axios";
export const checkAttendance = (req, res) => {
  console.log(req.query);
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      "https://apnagodam.com/emp_api/apna_emp_clock_status_new",
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
      "https://apnagodam.com/emp_api/v1_apna_emp_attendance_new",
      {
        clock_status: req.body.clock_status,
          distance: req.body.distance,
          image: req.body.image,

          long: req.body.long,
          lat: req.body.lat,
      },
      {
        headers: headers,
        
      },
      {}
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
