import deleteAllArtifactsFromDatabase from "../api/deleteAllArtifactsFromDatabase.js";
import deleteAllReportsFromDatabase from "../api/deleteAllReportsFromDatabase.js";

async function deleteAllDbContent() {
  await deleteAllArtifactsFromDatabase();
  await deleteAllReportsFromDatabase();
}

await deleteAllDbContent();
