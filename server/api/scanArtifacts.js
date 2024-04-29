import getArtifactFromMandiant from "./getArtifactFromMandiant.js";
("../api/getArtifactFromMandiant.js");
import getArtifactFromDatabase from "./getArtifactFromDatabase.js";
import saveArtifactToDatabase from "./saveArtifactToDatabase.js";

export default async function scanArtifacts(listOfArtifacts) {
  let highest_mscore = 0;
  let scannedArtifacts = [];

  for (const artifact of listOfArtifacts) {
    let artifactFromDB = false;

    let scannedArtifact = await getArtifactFromDatabase(artifact);
    if (scannedArtifact && scannedArtifact.length > 0) artifactFromDB = true;

    if (artifactFromDB) {
      scannedArtifacts.push(scannedArtifact[0]);
      if (scannedArtifact[0].mscore > highest_mscore) {
        highest_mscore = scannedArtifact[0].mscore;
      }
    }

    if (!artifactFromDB) {
      scannedArtifact = await getArtifactFromMandiant(artifact);
      console.log(scannedArtifact, "scanned Artifact preif");

      if (!scannedArtifact || scannedArtifact.length === 0) {
        console.log(scannedArtifact, "postif");
        scannedArtifact = {
          id: "-",
          type: "No IOC Intel.",
          value: artifact,
          mscore: "-",
          last_updated: "-",
          first_seen: "-",
          last_seen: "-",
          date_scanned: new Date(),
          sources: null,
          misp: null,
        };
      }
      saveArtifactToDatabase(scannedArtifact);
      scannedArtifacts.push(scannedArtifact);
      if (scannedArtifact?.mscore && scannedArtifact?.mscore > highest_mscore) {
        highest_mscore = scannedArtifact.mscore;
      }
    }
  }
  return { scannedArtifacts: scannedArtifacts, highest_mscore: highest_mscore };
}
