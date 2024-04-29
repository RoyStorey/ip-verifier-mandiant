// import saveReportToDatabase from "../server/api/saveReportToDatabase.js";
// import saveArtifactToDatabase from "../server/api/saveArtifactToDatabase.js";
// import { v4 as uuidv4 } from "uuid";
// import formatDate from "../client/functions/formatDate.js";
// import deleteArtifactFromDatabase from "../server/api/deleteArtifactFromDatabase.js";

// function isIpExpired(ip) {
//   return new Date(ip.expirationdate).valueOf() < new Date(new Date()).valueOf();
// }
// function isIpInDatabase(ip) {
//   if (ip.uid) return true;
//   else return false;
// }
// async function replaceIpInDatabase(ip, reportUID) {
//   await deleteIpFromDatabase(ip.uid);
//   const currentScannedIp = {
//     reportuid: reportUID,
//     dateofscan: new Date(),
//     expirationdate: expirationDate,
//     ...ip,
//     risk_score: riskScore,
//   };
//   saveIpToDatabase(currentScannedIp, reportUID);
// }

// export default async function saveReport(scannedIpList) {
//   const expirationDate = new Date(
//     new Date().setMonth(new Date().getMonth() + 3)
//   ).toDateString();
//   let highestRisk = 0;

//   const currentReport = {
//     uid: reportUID,
//     dateOfReport: new Date(),
//     reportName: formatDate(new Date()) + " Report",
//     expirationDate,
//     highestLevelOfThreat: 0,
//     noOfIpsScanned: scannedIpList.length,
//     scannedIps: [],
//   };

//   scannedIpList.forEach((scannedIp) => {
//     console.log(scannedIp.ip, scannedIp.uid);
//     let riskScore = 0;
//     currentReport.scannedIps.push(scannedIp.ip);
//     if (typeof scannedIp.risk_score == "object") {
//       riskScore = parseInt(scannedIp.risk_score.result);
//     } else {
//       riskScore = parseInt(scannedIp.risk_score);
//     }
//     highestRisk = Math.max(highestRisk, riskScore);

//     if (isIpInDatabase(scannedIp) && isIpExpired(scannedIp)) {
//       replaceIpInDatabase(scannedIp, reportUID);
//     }

//     if (!isIpInDatabase(scannedIp)) {
//       const currentScannedIp = {
//         reportuid: reportUID,
//         dateofscan: new Date(),
//         expirationdate: expirationDate,
//         ...scannedIp,
//         risk_score: riskScore,
//       };
//       saveIpToDatabase(currentScannedIp, reportUID);
//     }
//   });

//   currentReport.highestLevelOfThreat = highestRisk;
//   if (scannedIpList.length > 1) saveReportToDatabase(currentReport);
// }
