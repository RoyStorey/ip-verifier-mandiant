import React, { useState, useEffect } from "react";
import "../styles/single-artifact-lookup.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

export default function SingleArtifactLookup() {
  const [lookupArtifact, setLookupArtifact] = useState("");
  const [artifactData, setArtifactData] = useState({});

  async function handleArtifactLookup(artifact) {
    setArtifactData({});
    const res = await axios.get(
      `http://${SERVER_HOST}:${PORT}/getArtifact?artifact=${artifact}`
    );
    console.log(res.data);
    if (res.data) {
      setArtifactData(res.data);
    }
  }

  function ArtifactSources(artifactData) {
    if (artifactData.sources) {
      return artifactData.sources.map((source) => {
        return (
          <div className="block">
            {/* <p>{source.category}</p> */}
            <p>Source Name: {source.source_name}</p>
            <p>First Seen: {source.first_seen}</p>
            <p>Last Seen: {source.last_seen}</p>
            <p>OSINT: {source.osint}</p>
          </div>
        );
      });
    } else {
      return <p>No sources available</p>;
    }
  }

  //misp is an object with a lot of keys and values
  function ArtifactMisp(artifactData) {
    if (artifactData.misp) {
      return Object.keys(artifactData.misp).map((key) => {
        return (
          <div>
            <p>
              {key}: {JSON.stringify(artifactData.misp[key])}
            </p>
          </div>
        );
      });
    } else {
      return <p>No MISP data available</p>;
    }
  }

  return (
    <div className="widget-wrapper">
      <div className="single-artifact-lookup">
        <h3>Single Artifact Lookup</h3>
        <div className="form">
          <input
            type="text"
            name="artifact-text"
            id="artifact-text"
            onBlur={(e) => {
              setLookupArtifact(e.target.value);
            }}
          ></input>
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={() => {
                handleArtifactLookup(lookupArtifact);
              }}
            />
          </button>
        </div>
        <div className="whole">
          <div className="half">
            <div className="block">
              <p className="block-title">Artifact Data</p>
              <p>
                Artifact:{" "}
                {artifactData.artifact
                  ? artifactData.artifact
                  : artifactData.value}
              </p>
              <p>Type: {artifactData.type}</p>
              <p>MScore: {artifactData.mscore}</p>
            </div>
            <div className="block" id="source-source-data">
              <p>Sources</p>
              {ArtifactSources(artifactData)}
            </div>
          </div>
          <div className="half">
            <div className="block" id="source-time-data">
              <p className="block-title">Time</p>
              <p>First Seen: {artifactData.first_seen}</p>
              <p>Last Seen: {artifactData.last_seen}</p>
              <p>Last Updated: {artifactData.last_updated}</p>
            </div>
            <div className="block">
              <p className="block-title">MISP</p>
              {ArtifactMisp(artifactData)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//brother ew.
