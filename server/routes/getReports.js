import postgreSQLClient from "../postgres.js";

async function getReports(req, res) {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
    SELECT *
    FROM reports
    ORDER BY date DESC
  `;

    const { rows } = await client.query(query);

    res.json(rows);
    client.release();
  } catch (error) {
    console.log(error);
    client.release();
  }
}

export default getReports;
