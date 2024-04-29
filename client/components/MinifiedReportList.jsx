import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../functions/formatDate";
import "../styles/minified-report-list.css";

function MinifiedReportList(data) {
  let formattedContent;

  function TableHeader() {
    return (
      <div className="header">
        {/* <p></p> */}
        <p>Date of Scan</p>
        <p className="report-name">Report Name</p>
      </div>
    );
  }

  function formatReport(reportData) {
    let content;

    content = Object.keys(reportData).map((key, index) => {
      const report = reportData[key];
      let threatLevel = "low-threat";
      if (
        report.highestlevelofthreat > 1 &&
        report.highestlevelofthreat <= 33
      ) {
        threatLevel = "mid-threat";
      }
      if (
        report.highestlevelofthreat > 33 &&
        report.highestlevelofthreat <= 66
      ) {
        threatLevel = "high-threat";
      }
      if (
        report.highestlevelofthreat > 66 &&
        report.highestlevelofthreat <= 100
      ) {
        threatLevel = "crit-threat";
      }

      return (
        <Link key={report.uid} to={`/report/${report.uid}`}>
          <div className="report" key={index}>
            <p>{formatDate(report.date)}</p>
            <p className="report-name">{report.name}</p>
          </div>
        </Link>
      );
    });

    return content;
  }

  formattedContent =
    Object.keys(data).length > 0
      ? formatReport(data.data)
      : "No entries found.";

  return (
    <div className="widget-wrapper">
      <h3>Recent Reports</h3>
      <TableHeader />
      <div>{formattedContent}</div>
    </div>
  );
}
export default MinifiedReportList;
