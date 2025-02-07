import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-bootstrap";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
function App() {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="container-fluid"
      w-100
      m-0
      p-0
    >
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="login" element={<LoginPage />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
