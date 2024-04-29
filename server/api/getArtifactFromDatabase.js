import postgreSQLClient from "../postgres.js";

const getArtifactFromDatabase = async (artifact) => {
  const client = await postgreSQLClient.connect();

  try {
    const query = `
    SELECT *
    FROM artifacts
    WHERE artifact = $1
  `;

    const { rows } = await client.query(query, [artifact]);

    client.release();
    return rows;
  } catch (error) {
    console.log(error);
    client.release();
  }
};

export default getArtifactFromDatabase;
