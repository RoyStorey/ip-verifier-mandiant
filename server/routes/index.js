import express from "express";
import getArtifacts from "./getArtifacts.js";
import getIpsByReport from "./getUniqueReportIps.js";
import getReports from "./getReports.js";
import getArtifact from "./getArtifact.js";
import getReport from "./getReport.js";
import handleFileUpload from "./handleFileUpload.js";
import deleteReport from "./deleteReport.js";
import updateReport from "./updateReport.js";

const routes = express.Router();

routes.get("/getArtifact", getArtifact);
routes.get("/getArtifacts", getArtifacts);
routes.get("/getReport", getReport);
routes.get("/getReports", getReports);
routes.get("/getIpsByReport", getIpsByReport);
routes.post("/handleFileUpload", handleFileUpload);
routes.post("/deleteReport", deleteReport);
routes.patch("/updateReport", updateReport);

export default routes;
