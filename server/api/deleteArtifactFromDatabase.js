import postgreSQLClient from "../postgres.js";

const deleteArtifactFromDatabase = async (uid) => {
  const client = await postgreSQLClient.connect();

  console.log("artifact being deleted");

  try {
    const query = `
    DELETE FROM artifacts
    WHERE uid = $1
  `;

    const { rows } = await client.query(query, [uid]);

    client.release();
  } catch (error) {
    client.release();
  }
};

export default deleteArtifactFromDatabase;
