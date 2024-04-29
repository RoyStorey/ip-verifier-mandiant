import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import "../styles/single-artifact.css";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

function getColor(mscore) {
  const hue = ((100 - mscore) * 120) / 100; // 0 is red, 120 is green
  return `hsl(${hue}, 100%, 50%)`; // Fully saturated, moderate lightness
}

async function fetchArtifact(artifact) {
  try {
    const response = await axios.get(
      `http://${SERVER_HOST}:${PORT}/getArtifact?artifact=${artifact}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching IOC:", error);
    throw error;
  }
}

function InfoHeader({ data }) {
  if (data?.artifact == undefined) {
    return <p>no data found</p>;
  }
  return (
    <div className="info-header panel">
      <div>
        <h1>{data?.artifact ? data.artifact : "No artifact found"}</h1>
        <h4>{data?.id ? data.id : "No ID found"}</h4>
      </div>
      <div className="sub-header">
        <h3 style={{ color: getColor(data?.mscore) }}>
          Mandiant Score:{" "}
          {data?.mscore ? data.mscore : "No Mandiant Score found."}
        </h3>
        <h3>IOC Type: {data?.type ? data.type : "No Type found."}</h3>
      </div>
    </div>
  );
}

function InfoSources({ data }) {
  if (data?.sources == undefined) {
    return <p>no data found</p>;
  }
  return (
    <div className="info-sources panel">
      <h2>Sources</h2>
      <ul>
        {data.sources.map((source) => (
          <li key={source.source_name}>
            <h3>{source.source_name}</h3>
            <p>First Seen: {source.first_seen}</p>
            <p>Last Seen: {source.last_seen}</p>
            <p>OSINT: {source.osint ? "Yes" : "No"}</p>
            <p>Category: {source.category.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoMisp({ data }) {
  if (!data?.misp || Object.keys(data.misp).length === 0) {
    return <p>No MISP data found</p>;
  }
  return (
    <div className="info-misp panel">
      <h2>Mandiant Intel Sharing Platform</h2>
      <ul>
        {Object.entries(data.misp).map(([key, value]) => (
          <li key={key}>
            <h3>{key}</h3>
            <p>{value ? "True" : "False"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoDateData({ data }) {
  if (data?.last_updated == undefined) {
    return (
      <p>
        either the server is down, or we haven't queried for this artifact
        before.
      </p>
    );
  }
  return (
    <div className="info-date-data panel">
      <h2>Date Data</h2>
      <p>Last Updated: {data.last_updated}</p>
      <p>First Seen: {data.first_seen}</p>
      <p>Last Seen: {data.last_seen}</p>
    </div>
  );
}

function InfoResourcesPanel({ data }) {
  if (data?.artifact == undefined) {
    return <p>no data found</p>;
  }
  return (
    <div className="resources-panel panel">
      <h2>Resources</h2>
      <ul>
        <a href={`https://otx.alienvault.com/indicator/ip/${data.artifact}`}>
          <li>Alienvault</li>
        </a>
        <a href={`https://search.dnslytics.com/ip/${data.artifact}`}>
          <li>DNSlytics</li>
        </a>
        <a href="https://www.url2png.com/">
          <li>URL2PNG</li>
        </a>
        <a href="https://www.urlscan.io/">
          <li>URLScan.io</li>
        </a>
        <a href={`https://www.virustotal.com/gui/ip-address/${data.artifact}`}>
          <li>VirusTotal</li>
        </a>
      </ul>
    </div>
  );
}

export default function SingleArtifact() {
  const { artifact } = useParams();
  const [artifactData, setArtifactData] = useState(null);

  useEffect(() => {
    fetchArtifact(artifact)
      .then((data) => {
        setArtifactData(data);
      })
      .catch((error) => {
        console.error("Error fetching artifact:", error);
      });
  }, [artifact]);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="content-container">
          <div className="first-row">
            <InfoHeader data={artifactData} />
          </div>
          <div className="second-row">
            <div className="column">
              <InfoSources data={artifactData} />
            </div>
            <div className="column">
              <InfoMisp data={artifactData} />
              <InfoResourcesPanel data={artifactData} />
              <InfoDateData data={artifactData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
