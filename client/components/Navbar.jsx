import React from "react";
import { Link, Outlet } from "react-router-dom";
import AirForce from "../media/AirForceLogo.png";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFile, faList } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="header-image-container">
          <img src={AirForce} alt="US Air Force Logo" />
        </div>
        <h2>Bulk Artifact Analysis</h2>
        <div className="links">
          <Link className="link" to="/">
            <FontAwesomeIcon icon={faHome} />
            Home
          </Link>
          <Link className="link" to="/reports">
            <FontAwesomeIcon icon={faFile} />
            Reports
          </Link>
          <Link className="link" to="/all-artifacts">
            <FontAwesomeIcon icon={faList} />
            IPs
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
