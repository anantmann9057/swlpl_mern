import {  Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function Header() {

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>SWLPL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to='/dashboard'
              >
                Home
              </Nav.Link>
              <Nav.Link as={Link}
                to='/attendance'>Attendance</Nav.Link>

              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
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
              {localStorage.getItem("user") ? (
                <Nav.Link
                  href="/"
                  onClick={() => {

                  }}
                >
                  <img className="rounded-circle" src={"https://apnagodam.com/resources/assets/upload/employees/"+ JSON.parse(localStorage.getItem("user")).passport_image}
                  
                    style={
                      {
                        width:"25px",
                        height:"25px",
                        
                      }
                    }
                  ></img>
                </Nav.Link>
              ) : (
                null
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
