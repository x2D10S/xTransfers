import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
        <Nav>
        <NavLink to='/'>
            <h1>Football Transfers</h1>
        </NavLink>
        <NavMenu>
            <NavLink to='/transfer'>
                Add Transfer
            </NavLink>
            <NavLink to='/searchTransfer'>
                Search Transfer
            </NavLink>
            <NavLink to='/deleteTransfer'>
                Delete Transfer
            </NavLink>
        </NavMenu>
        </Nav>
    </div>
  )
}

export default Navbar

const Nav = styled.nav`
background-color: #000;
height: 80px;
max-height: 30em;
display: flex;
justify-content: space-between;
padding: 0.5rem calc((100vw - 1000px) /2);
z-index: 10;
`;

const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&:active{
    color: #15CDFC;
}
&:hover{
    color: #256ce1;
}
`;

const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
`;