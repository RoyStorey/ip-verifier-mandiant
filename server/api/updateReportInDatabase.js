import postgreSQLClient from "../postgres.js";

const updateReportInDatabase = async (report) => {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
      UPDATE reports
      SET name = $2
      WHERE uid = $1
      RETURNING uid;
    `;

    const { rows } = await client.query(query, [report.uid, report.reportName]);
    client.release();

    if (rows.length === 0) {
      throw new Error("Report not found or no changes made.");
    }

    return rows[0];
  } catch (error) {
    console.error(error);
    client.release();
    throw error;
  }
};

export default updateReportInDatabase;
