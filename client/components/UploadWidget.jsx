import FileUpload from "../components/FileUpload";
import React from "react";

export default function UploadWidget() {
  return (
    <div className="upload">
      <div className="body-header">
        <p>Please upload a file to get started</p>
        <p>Only files with greater than 1 IP will become reports</p>
      </div>
      <div>
        <FileUpload />
      </div>
    </div>
  );
}
