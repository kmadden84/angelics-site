import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav.Link as="span"><Link href="/"><a className="header-link active">Angelica's Blog and Portfolio</a></Link></Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as="span"><Link href="/About"><a className="header-link">About Me</a></Link></Nav.Link>
            <Nav.Link as="span"><Link href="/Cv"><a className="header-link">Curriculum Vitae</a></Link></Nav.Link>
            <Nav.Link as="span"><Link href="/Blogs"><a className="header-link">Blogs</a></Link></Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;