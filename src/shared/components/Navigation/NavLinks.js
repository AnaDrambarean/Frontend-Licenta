import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { AuthOContext } from "../../context/authO-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const authO = useContext(AuthOContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          FURNIZORI
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.furnizorId}/services`}>SERVICIILE MELE</NavLink>
        </li>
      )}
      {authO.isLoggedIn && (
        <li>
          <NavLink to={`/${authO.organizatorId}/events`}>EVENIMENTELE MELE</NavLink>
        </li>
      )}
       {authO.isLoggedIn && (
        <li>
          <NavLink to="/events/new">ADAUGĂ EVENIMENT</NavLink>
        </li>
      )}
      
      {authO.isLoggedIn && (
        <li>
          <NavLink to={`/${authO.organizatorId}/cont`}>CONTUL MEU</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/services/new">ADAUGĂ SERVICIU</NavLink>
        </li>
      )}
      {(!auth.isLoggedIn && !authO.isLoggedIn)&& (
        <li>
          <NavLink to="/auth">AUTENTIFICARE</NavLink>
        </li>
      )}
      {auth.isLoggedIn  && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      {authO.isLoggedIn  && (
        <li>
          <button onClick={authO.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
