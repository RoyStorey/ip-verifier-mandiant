// import scanIpList from "./scanArtifacts.js";
import saveReport from "./saveReport.js";

const handleFileUpload = async (req, res) => {
  const artifacts = req.body.artifacts;
  // console.log(artifacts);
  // let artifactData = await scanIpList(artifacts);
  saveReport(artifacts);
  res.send({
    message: "Artifacts processed successfully.",
    // data: artifacts,
  });
};

export default handleFileUpload;
