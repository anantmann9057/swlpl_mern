import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-bootstrap";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Profile from "./pages/Profile";
function App() {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="container-fluid"
     
    >
      <Routes>
        <Route path="/" element={<HomePage />}>
       
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="login" element={<LoginPage />}></Route>
      </Routes>
      <ToastContainer
      />
    </div>
  );
}

export default App;
