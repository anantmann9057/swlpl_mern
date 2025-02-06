import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>SWLPL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link to="/dashboard">Attendance</Nav.Link>

              <Nav.Link to="/">Profile</Nav.Link>
              {localStorage.getItem("token") ? (
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Login
                </Nav.Link>
              )}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login" onClick={()=>{
                  localStorage.clear();
                }}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Logout
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
