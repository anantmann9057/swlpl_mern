import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function CaseIds() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [caseIds,setCaseIds] = useState([]);
  
  const columns = [
    {
      width: 100,
      label: 'case Id',
      dataKey: 'firstName',
    },
    {
      width: 100,
      label: 'Last Name',
      dataKey: 'lastName',
    },
    {
      width: 50,
      label: 'Age',
      dataKey: 'age',
      numeric: true,
    },
    {
      width: 110,
      label: 'State',
      dataKey: 'state',
    },
    {
      width: 130,
      label: 'Phone Number',
      dataKey: 'phone',
    },
  ];

  useEffect(() => {
    if (auth) {
      axios
        .get(import.meta.env.VITE_SERVER_BASE_URL + "/cases/runningCases", {
          authToken: localStorage.getItem("token")
        })
        .then((response) => {
          setOpen(false);

          if (response.data.status == "3") {
            localStorage.clear();
          }
          setCaseIds(response.data.data);
          toast(caseIds);
          console.log(caseIds);
        })
        .catch((e) => {
          setOpen(false);
        });
    } else {
      useNavigate("/login");
    }
  }, []);
  return (
    <>
      <ToastContainer></ToastContainer>
      <TableRow>
      {columns.map((column,index) => (
        <TableCell
          key={index}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
    {CaseIds.map((column,index) => (
        <TableCell
          key={index}
        >
        {
            
        }
        </TableCell>
      ))}
    </>
  );
}
