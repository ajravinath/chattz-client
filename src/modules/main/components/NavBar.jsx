import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Chattz</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              Conversations
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarText>
          <NavLink tag={Link} to="/login">
            Logout
          </NavLink>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
