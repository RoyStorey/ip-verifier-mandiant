import postgreSQLClient from "../postgres.js";
import { v4 as uuidv4 } from "uuid";

const saveReportToDatabase = async (report) => {
  const client = await postgreSQLClient.connect();
  try {
    const query = `
      INSERT INTO reports
         (uid,
          name,
          highest_mscore,
          date,
          artifacts
          ) 
        values($1,$2,$3,$4,$5)
      RETURNING uid;
      `;

    const { rows } = await client.query(query, [
      uuidv4(),
      report.name,
      report.highest_mscore,
      report.date,
      report.artifacts,
    ]);
    client.release();
    return rows[0];
    // }
  } catch (error) {
    console.log(error);
    client.release();
  }
};

export default saveReportToDatabase;

// saveReportToDatabase({
//   name: "Mandiant Report",
//   highest_mscore: 58,
//   date: "2022-06-12T03:55:20.000+0000",
//   artifacts: ["155.155.155.155"],
// });
