import axios from "axios";

export const getCaseRequests = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: req.body.authToken,
  };
  axios
    .post(
      process.env.PRODUCTION_URL+  "/emp_api/apna_emp_stack_request",
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
