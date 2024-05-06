import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import ReportData from "../components/ReportData";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/report-page.css";
import Footer from "../components/Footer";
import ListOfArtifacts from "../components/ListOfArtifacts";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

async function getReport(uid) {
  return axios
    .get(`http://${SERVER_HOST}:${PORT}/getReport`, {
      params: {
        uid: uid,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

async function getArtifact(artifact_value) {
  return axios
    .get(`http://${SERVER_HOST}:${PORT}/getArtifact`, {
      params: {
        artifact: artifact_value,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function ReportPage() {
  const { uid } = useParams();
  const [artifacts, setArtifacts] = useState([]);
  const [reportName, setReportName] = useState([]);
  const [rawReportData, setReportData] = useState([]);

  async function deleteReport(reportId) {
    if (window.confirm("Are you sure you would like to delete this report?")) {
      try {
        await axios.post(`http://${SERVER_HOST}:${PORT}/deleteReport`, {
          uid: reportId,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleReportDelete(reportuid) {
    await deleteReport(reportuid);
    window.location.href = "/reports/";
  }

  async function handleNameChange(reportuid) {
    let newReportName = prompt("Input new report name");
    if (newReportName == undefined) return;
    setReportName(newReportName);
    try {
      await axios.patch(`http://${SERVER_HOST}:${PORT}/updateReport`, {
        params: {
          uid: reportuid,
          reportName: newReportName,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getListOfArtifactData(artifactList) {
    let artifactData = [];
    for (let i = 0; i < artifactList.length; i++) {
      artifactData.push(await getArtifact(artifactList[i]));
    }
    return artifactData;
  }

  useEffect(() => {
    getReport(uid).then(async (data) => {
      setReportName(data.name);
      setReportData(data);
      setArtifacts(await getListOfArtifactData(data.artifacts));
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="report-body">
        <header>
          <div>
            <div className="report-name-block">
              <h1>{reportName}</h1>
              <h4>{rawReportData.uid}</h4>
            </div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                handleNameChange(rawReportData.uid);
              }}
              className="fa-icon"
            />
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              handleReportDelete(rawReportData.uid);
            }}
            className="fa-icon"
          />
        </header>

        <div className="ip-report">
          {/* <ReportData artifacts={artifacts} /> */}
          {artifacts.length > 0 ? (
            <ListOfArtifacts artifacts={artifacts} />
          ) : (
            <p>Loading Artifacts..</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
