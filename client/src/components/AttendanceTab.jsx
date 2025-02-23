import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function AttendanceTab() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [outApprovalList, setOutList] = useState([]);
  const [inApprovalList, setInList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState("");
  const [id, setId] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    if (auth) {
      setOpen(true);
      axios
        .post(
          import.meta.env.VITE_SERVER_BASE_URL + "/attendance/approvalListOut",
          {
            authToken: localStorage.getItem("token"),
          }
        )
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            localStorage.clear();
          }
          if (response.data.out_atten_data) {
            setOutList(response.data.out_atten_data);
          }
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);

          setOpen(false);
        });

      setOpen(true);
      axios
        .post(
          import.meta.env.VITE_SERVER_BASE_URL + "/attendance/approvalListIn",
          {
            authToken: localStorage.getItem("token"),
          }
        )
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            localStorage.clear();
          }
          if (response.data.in_atten_data) {
            setInList(response.data.in_atten_data);
          }
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);

          setOpen(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const approveAttendance = ({ id, notes, status, type }) => {
    setOpenDialog(false);

    setOpen(true);
    axios
      .post(
        import.meta.env.VITE_SERVER_BASE_URL + "/attendance/approveRequest",
        {
          authToken: localStorage.getItem("token"),
          id: id,
          status: status,
          notes: notes,
          type: type,
        }
      )
      .then((response) => {
        setOpen(false);
        console.log(response.data);
        if (response.data.status == "3") {
          localStorage.clear();
          navigate("/login");

        }
        if (response.data.status == "1") {
          window.location.reload();
        }
        toast(response.data.message);
      })
      .catch((e) => {
        console.log(e);

        setOpen(false);
      });
  };

  const rejectAttendance = ({ id, notes, status, type }) => {
    setOpenDialog(false);

    setOpen(true);

    axios
      .post(
        import.meta.env.VITE_SERVER_BASE_URL + "/attendance/rejectRequest",
        {
          authToken: localStorage.getItem("token"),
          id: id,
          status: status,
          notes: notes,
          type: type,
        }
      )
      .then((response) => {
        setOpen(false);
        console.log(response.data);
        if (response.data.status == "3") {
          localStorage.clear();
          navigate("/login");

        }
        if (response.data.status == "1") {
          window.location.reload();
        }
        toast(response.data.message);
      })
      .catch((e) => {
        console.log(e);

        setOpen(false);
      });
  };
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
      <Tabs
        defaultActiveKey="clock_in"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="clock_in" title="Clock In Requests">
          {inApprovalList.map(function (data, index) {
            return (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    {data.first_name} {data.last_name} {data.emp_id} (
                    {data.emp_id})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>IN Time - {data.time}</Typography>

                  <img src={data.image} className="mt-5"></img>

                  <Row className="mt-5">
                    <Col className="w-100">
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => {
                          setOpenDialog(true);
                          setId(data.id);
                          setStatus("2");
                          setType("in_status");
                        }}
                      >
                        Approve
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setOpenDialog(true);
                          setId(data.id);
                          setStatus("0");
                          setType("in_status");
                        }}
                        className="w-100"
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Tab>
        <Tab eventKey="clock_out" title="Clock Out Requests">
          {outApprovalList.map(function (data, index) {
            return (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    {data.first_name} {data.last_name} {data.emp_id} (
                    {data.emp_id})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Out Time - {data.time}</Typography>

                  <img src={data.image} className="mt-5"></img>

                  <Row className="mt-5">
                    <Col className="w-100">
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => {
                          setOpenDialog(true);
                          setId(data.id);
                          setStatus("2");
                          setType("out_status");
                        }}
                      >
                        Approve
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setOpenDialog(true);
                          setId(data.id);
                          setStatus("0");
                          setType("out_status");
                        }}
                        className="w-100"
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Tab>
      </Tabs>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
            },
          },
        }}
      >
        <DialogTitle>Are you Sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {status == "2" ? "approve" : "reject"} request?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="normal"
            id="notes"
            name="email"
            label="notes"
            fullWidth
            variant="outlined"
            onChange={(value) => {
              setNotes(value.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              const element = document.getElementById("notes");
              setNotes(element.target);

                if (status == 2) {
                  approveAttendance({ id:id,notes:notes,status:status,type:type });
                } else {
                  rejectAttendance({  id:id,notes:notes,status:status,type:type });
                }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
