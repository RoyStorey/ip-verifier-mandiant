import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import UploadWidget from "../components/UploadWidget";
import MinifiedReportList from "../components/MinifiedReportList";
import SingleIPLookup from "../components/SingleIPLookup";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

export default function Home() {
  const [reports, setReports] = useState([]);

  async function fetchReports() {
    try {
      const response = await axios.get(
        `http://${SERVER_HOST}:${PORT}/getReports`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchReports().then((data) => {
      setReports(data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-body">
        <div className="widgets">
          <UploadWidget />
          <SingleIPLookup />
        </div>
        <div className="widgets">
          <MinifiedReportList data={reports} />
        </div>
      </div>
      <Footer />
    </>
  );
}
