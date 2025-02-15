import "./App.css";
import { Route, Routes, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-bootstrap";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
function App() {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="container-fluid p-0 m-0"
     
    >
      <Routes>
        <Route path="/" element={<HomePage />}>

        </Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="attendance" element={<Attendance />}></Route>

        <Route path="profile" element={<Profile />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
      </Routes>
      <ToastContainer
      />
    </div>
  );
}

export default App;
