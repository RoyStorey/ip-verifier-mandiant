import postgreSQLClient from "../postgres.js";

const deleteAllReportsFromDatabase = async () => {
  const client = await postgreSQLClient.connect();

  console.log("All reports being deleted");

  try {
    const query = `
    DELETE FROM reports;
  `;

    const res = await client.query(query);

    console.log(`Total deleted reports: ${res.rowCount}`);

    client.release();
  } catch (error) {
    console.error("Failed to delete reports:", error.stack);
    client.release();
    throw error; // Re-throw the error to handle it (or log it) in the caller function.
  }
};

export default deleteAllReportsFromDatabase;
