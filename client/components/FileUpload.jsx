import React, { useState, useEffect } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "../styles/upload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_PORT;

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [parseStatus, setParseStatus] = useState("Parse");

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      setFile(inputFile);
    }
  };

  const handleParse = async () => {
    if (!file) {
      alert("Please select a file to parse.");
      return;
    }

    setParseStatus("Parsing, please wait..");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const parsedData = lines.map((line) => {
        return line.trim();
      });
      setData(parsedData);
    };
    reader.readAsText(file);
  };

  function validateIPs(ipList) {
    const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

    const regexLocalhost = /^(127\.)/;
    const regexPrivateNetwork10 = /^(10\.)/;
    const regexPrivateNetwork172 = /^(172\.(1[6-9]|2[0-9]|3[0-1])\.)/;
    const regexPrivateNetwork192 = /^(192\.168\.)/;
    const regexPrivateNetwork131 = /^(131\.14\.)/;
    const regexAPIPA = /^(169\.254\.)/;
    const regexMulticast = /^(22[4-9]|23[0-9])\./;
    const regexFutureUse = /^(24[0-9]|25[0-5])\./;
    const regexBroadcast = /^(255\.255\.255\.255)/;

    const ipRegexes = [
      regexLocalhost,
      regexPrivateNetwork10,
      regexPrivateNetwork172,
      regexPrivateNetwork192,
      regexPrivateNetwork131,
      regexAPIPA,
      regexMulticast,
      regexFutureUse,
      regexBroadcast,
    ];

    let validIPs = [];

    for (let ip of ipList) {
      let isPublic = true;
      let isIPV4 = true;

      if (!ipRegex.test(ip)) isIPV4 = false;

      if (ipRegexes.some((regex) => regex.test(ip))) {
        isPublic = false;
      }

      if (isPublic && isIPV4) validIPs.push(ip);
    }

    return validIPs;
  }

  async function postArtifacts(artifacts) {
    return axios
      .post(`http://${SERVER_HOST}:${PORT}/handleFileUpload`, {
        artifacts: artifacts,
      })
      .then((response) => {
        response.data;
        console.log("test!");
        setParseStatus("Parsed!");
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (data.length != 0) {
      postArtifacts(validateIPs(data));
    } else {
      // console.error("no data");
      return;
    }
  }, [data]);

  return (
    <div className="file-upload-container">
      <label>
        <FontAwesomeIcon icon={faUpload} />
        <p>Please upload a file</p>
        <input
          type="file"
          name="file"
          id="file"
          accept=".txt"
          onChange={handleFileChange}
        />
      </label>
      <button onClick={handleParse}>
        <p>{parseStatus}</p>
      </button>
    </div>
  );
};

export default FileUpload;
