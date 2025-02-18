import axios from "axios";
import { date } from "zod";
export const checkAttendance = (req, res) => {
  console.log(req.query);
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      process.env.PRODUCTION_URL + "/emp_api/apna_emp_clock_status_new",
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
      process.env.PRODUCTION_URL + "/emp_api/v1_apna_emp_attendance_new",
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

export const getOutApprovalList = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      process.env.PRODUCTION_URL + "/emp_api/out_atten_approval_list",
      {},
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
export const getInApprovalList = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      process.env.PRODUCTION_URL + "/emp_api/in_atten_approval_list",
      {},
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

export const approveAttendanceRequest = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  // return res.json({
  //   status: "1",
  //   message: "success",
  //   data:req.body
  // });
  axios
    .post(
      process.env.PRODUCTION_URL + "/emp_api/approve_emp_atten",
      {
        id: req.body.id,
        notes: req.body.notes,
        status: "2",
        type: req.body.type,
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

export const rejectAttendanceRequest = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  // return res.json({
  //   status: "1",
  //   message: "success",
  //   data:req.body
  // });
  axios
    .post(
      process.env.PRODUCTION_URL + "/emp_api/approve_emp_atten",
      {
        id: req.body.id,
        notes: req.body.notes,
        status: "0",
        type: req.body.type,
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
