import postgreSQLClient from "../postgres.js";

const deleteAllArtifactsFromDatabase = async () => {
  const client = await postgreSQLClient.connect();

  console.log("All artifacts being deleted");

  try {
    const query = `
    DELETE FROM artifacts;
  `;

    const res = await client.query(query);

    console.log(`Total deleted artifacts: ${res.rowCount}`);

    client.release();
  } catch (error) {
    console.error("Failed to delete artifacts:", error.stack);
    client.release();
    throw error; // Re-throw the error to handle it (or log it) in the caller function.
  }
};

export default deleteAllArtifactsFromDatabase;
