import CaseIdCard from "../components/CaseIdCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";
import AppAppBar from "../components/AppBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { styled } from '@mui/material/styles';

export default function Dashboard() {
  const auth = localStorage.getItem("token");
  const [inwardCases, setInwardCases] = useState([]);
  const [outwardCases, setOutwardCases] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [caseIds, setCaseIds] = useState();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'darkcyan',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  useEffect(() => {
    if (auth) {
      setOpen(true);
      axios
        .post(import.meta.env.VITE_SERVER_BASE_URL + "/cases/caseRequests", {
          authToken: localStorage.getItem("token"),
        })
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            navigate("/login");
            localStorage.clear();
          } else if (response.data.status == "1") {
            setInwardCases(response.data.inward_request_data);
            setOutwardCases(response.data.outward_request_data);

            toast(response.data.status.message);
          }

          console.log(response);
        })
        .catch((e) => {
          setOpen(false);
        });

      setOpen(true);
      axios
        .get(import.meta.env.VITE_SERVER_BASE_URL + "/cases/getRunningCases", {
          authToken: localStorage.getItem("token"),
        })
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            navigate("/login");

            localStorage.clear();
          } else if (response.data.status == "1") {
            setCaseIds(response.data.data.data);
          }

          console.log(response);
        })
        .catch((e) => {
          setOpen(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="mt-5">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer></ToastContainer>
      <AppAppBar />
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
      >
        <CaseIdCard
          key={0}
          title="Inwards Requests"
          header="Inwards"
          icon={<SouthWestIcon></SouthWestIcon>}
          cases={inwardCases.length}
        />

        <CaseIdCard
          key={1}
          title="Outwards Requests"
          header="Outwards"
          icon={<NorthEastIcon></NorthEastIcon>}
          cases={outwardCases.length}
        />
      </Stack>
      {
        <TableContainer component={Paper}>
          <Table className="" aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Case Id </StyledTableCell>
                <StyledTableCell align="center">Gatepass</StyledTableCell>
                <StyledTableCell align="center">Vehicle</StyledTableCell>
                <StyledTableCell align="center">Driver</StyledTableCell>
                <StyledTableCell align="center">Customer</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {caseIds
                ? caseIds.map(function (row, index)  {
                  var currentInStatus='';

                  if (caseIds[index]?.truckbook == null) {
                                  currentInStatus = "Add Truck Book";
                               
                                } else if (caseIds[index]?.labourbook ==
                                    null)
                                  currentInStatus = "Add Labour";
                                else if (caseIds[index]
                                        ?.firstKantaParchi ==
                                    null) {
                               
                                  currentInStatus = "Add First Kanta Parchi";
                                } else if (caseIds[index]?.first_quality ==
                                    null) {
                                  
                                  currentInStatus = "Add First Quality";
                                } else if (caseIds[index]?.f_q_tagging ==
                                    null) {
                               
                                  currentInStatus = "IVR pending";
                                } else if (caseIds[index]?.s_k_parchi ==
                                    null) {
                                 
                                  currentInStatus = "Add Second Kanta Parchi";
                                } else if (caseIds[index]
                                        ?.s_quality_report ==
                                    null) {
                                 
                                  currentInStatus = "Add Second Quality Report";
                                } else if (caseIds[index]?.cctv_report ==
                                    null) {
                                 
                                  currentInStatus = "Update CCTV Report";
                                } else if (caseIds[index]?.ivr_report ==
                                    null) {
                               
                                  if (localStorage.getItem('user')
                                          .terminal !=
                                      null) {
                                    currentInStatus =
                                        "Gatepass Recommeded Approval Pending";
                                  } else {
                                    currentInStatus = "Gatepass recommended";
                                  }
                                } else if (caseIds[index]
                                        ?.gatepass_report ==
                                    null) {
                                  
                                  currentInStatus = "Gatepass Approval Pending";
                                } else {
                                  currentInStatus = "Done";
                                }
                                ;
                   return  <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.case_id}
                      </TableCell>
                      <TableCell align="center">{row.gate_pass}</TableCell>
                      <TableCell align="center">{row.vehicle_no}</TableCell>
                      <TableCell align="center">{row.driver_phone}</TableCell>
                      <TableCell align="center">{row.cust_fname}</TableCell>
                      <TableCell align="center">
                        <Button>{
                          `${currentInStatus}`
                        }</Button>
                      </TableCell>
                    </TableRow>;
              })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  );
}
