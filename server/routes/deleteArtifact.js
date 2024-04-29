import postgreSQLClient from "../postgres.js";

const deleteArtifact = async (req, res) => {
  const client = await postgreSQLClient.connect();
  const { uid } = req.body;

  console.log("artifact being deleted");

  try {
    const query = `
    DELETE FROM artifacts
    WHERE uid = $1
  `;

    const { rows } = await client.query(query, [uid]);

    client.release();
    res.json(rows);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
    client.release();
  }
};

export default deleteIp;
