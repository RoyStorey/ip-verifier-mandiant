import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../client/components/Navbar";
import Footer from "../client/components/Footer";
// import AnonymityPanel from "../components/AnonymityPanel";
import { useParams } from "react-router-dom";
import formatDate from "../client/functions/formatDate";
import "../styles/single-ip.css";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

async function fetchIp(ip) {
  return axios
    .get(`http://${SERVER_HOST}:${PORT}/getIp`, {
      params: {
        ip: ip,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export default function SingleIP() {
  let { ip } = useParams();

  //   This is such a freaking silly thing that states only go two deep or something. Need to figure this out.
  const [ipData, setIpData] = useState([]);
  const [anonymity, setAnonymity] = useState([]);
  const [blacklists, setBlacklists] = useState([]);
  const [engines, setEngines] = useState([]);
  const [information, setInformation] = useState([]);

  useEffect(() => {
    fetchIp(ip).then((data) => {
      // console.log(data);
      setIpData(data[0]);
      setAnonymity(data[0].anonymity);
      setBlacklists(data[0].blacklists);
      setEngines(data[0].blacklists.engines);
      setInformation(data[0].information);
    });
  }, []);

  function TitlePanel() {
    return (
      <div className="title-panel panel">
        <div className="title">
          <h1>{ipData.ip}</h1>
          <h2>Risk Score: {ipData.risk_score}</h2>
        </div>
        <p>UID: {ipData.uid}</p>
        <p>report UID: {ipData.reportuid}</p>
        <p>date scanned: {formatDate(ipData.dateofscan)}</p>
        <p>expiration date: {formatDate(ipData.expirationdate)}</p>
      </div>
    );
  }
  function ResourcesPanel() {
    return (
      <div className="resources-panel panel">
        <h1>Resources</h1>
        <ul>
          <a href={`https://otx.alienvault.com/indicator/ip/${ipData.ip}`}>
            <li>Alienvault</li>
          </a>
          <a href={`https://search.dnslytics.com/ip/${ipData.ip}`}>
            <li>DNSlytics</li>
          </a>
          <a href="https://www.url2png.com/">
            <li>URL2PNG</li>
          </a>
          <a href="https://www.urlscan.io/">
            <li>URLScan.io</li>
          </a>
          <a href={`https://www.virustotal.com/gui/ip-address/${ipData.ip}`}>
            <li>VirusTotal</li>
          </a>
        </ul>
      </div>
    );
  }

  function AnonymityPanel() {
    return (
      <div className="anonymity-panel panel">
        <h1>Anonymity</h1>
        <p>Is Proxy: {JSON.stringify(anonymity.is_proxy)}</p>
        <p>Is Web Proxy: {JSON.stringify(anonymity.is_webproxy)}</p>
        <p>Is Hosting: {JSON.stringify(anonymity.is_hosting)}</p>
        <p>Is VPN: {JSON.stringify(anonymity.is_vpn)}</p>
        <p>Is Tor Node: {JSON.stringify(anonymity.is_tor)}</p>
      </div>
    );
  }

  function BlacklistPanel() {
    let formattedEngines = [];
    for (let i = 0; i < Object.keys(engines).length; i++) {
      let currentEngine = (
        <div className="blacklist-entry">
          <h3>{engines[i].engine}</h3>
          <p>Detected: {JSON.stringify(engines[i].detected)}</p>
          <a href={engines[i].reference}>
            <p>Reference: {engines[i].reference}</p>
          </a>
        </div>
      );
      formattedEngines.push(currentEngine);
    }
    return (
      <div className="blacklists-panel panel">
        <div>
          <h1>Blacklists</h1>
          <h3>Detection Rate: {blacklists.detection_rate}</h3>
          <h3>
            Total Detections: {blacklists.detections}/{blacklists.engines_count}
          </h3>
        </div>
        <div className="blacklist-entries">{formattedEngines}</div>
      </div>
    );
  }

  function InformationPanel() {
    let entries = [];
    Object.entries(information).forEach((entry) => {
      let infoEntry = (
        <p>
          {entry[0]}: {entry[1]}
        </p>
      );
      entries.push(infoEntry);
    });
    return (
      <div className="information-panel panel">
        <h1>Information</h1>
        {entries}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="content-container">
          <div className="first-row">
            <TitlePanel />
            <ResourcesPanel />
          </div>
          <div className="second-row">
            <BlacklistPanel />
            <AnonymityPanel />
            <InformationPanel />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
