import axios from "axios";

export const getCaseRequests = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      process.env.PRODUCTION_URL + "emp_api/apna_emp_stack_request",
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

export const getRunningCases = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .get(
      process.env.PRODUCTION_URL +
        "/emp_api/apna_emp_get_caseid?limit=20&page=&status=1&search",
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
