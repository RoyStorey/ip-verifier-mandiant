import scanArtifacts from "../api/scanArtifacts.js";
import postgreSQLClient from "../postgres.js";
import axios from "axios";

const getArtifact = async (req, res) => {
  const client = await postgreSQLClient.connect();
  const { artifact } = req.query;

  try {
    const query = `
    SELECT *
    FROM artifacts
    WHERE artifact = $1
  `;

    const { rows } = await client.query(query, [artifact]);
    console.log(rows, "rows", rows.length);
    if (rows.length === 0) {
      let scannedArtifact = await scanArtifacts([artifact]);
      res.json(scannedArtifact.scannedArtifacts[0]);
    }
    if (rows.length > 0) res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }
  client.release();
};

export default getArtifact;
