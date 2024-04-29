import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import "../styles/report-page.css";
import Footer from "../components/Footer";
import ListOfArtifacts from "../components/ListOfArtifacts";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

async function fetchArtifacts() {
  try {
    const response = await axios.get(
      `http://${SERVER_HOST}:${PORT}/getArtifacts`
    );
    console.log(response.data, "lol");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default function AllArtifacts() {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetchArtifacts().then((data) => {
      setArtifacts(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="report-body">
        <header className="reports-header">
          <FontAwesomeIcon icon={faList} className="fa-icon" />
          <h1>All Scanned Artifacts</h1>
        </header>
        <div className="ip-report">
          <ListOfArtifacts artifacts={artifacts} />
        </div>
      </div>
      <Footer />
    </>
  );
}
