import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";
import AllArtifacts from "./pages/AllArtifacts";
import SingleArtifact from "./pages/SingleArtifact";
import NoPage from "./pages/NoPage";
import "./styles/app.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/all-artifacts" element={<AllArtifacts />} />
        <Route path="/single-artifact/:artifact" element={<SingleArtifact />} />
        <Route path="/report/:uid" element={<ReportPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
