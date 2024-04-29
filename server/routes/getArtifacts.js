import postgreSQLClient from "../postgres.js";

async function getArtifacts(req, res) {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
    SELECT *
    FROM artifacts
    ORDER BY date_scanned ASC
  `;

    const { rows } = await client.query(query);

    res.json(rows);
    client.release();
  } catch (error) {
    console.log(error);
    client.release();
  }
}

export default getArtifacts;
