import React from "react";
import DashboardContent from "../dashboard/DashboardContent";
import "./Dashboard.css";

const Dashboard = () => {
  const parameters = new URLSearchParams(window.location.search);
  const libraries = JSON.parse(localStorage.getItem("libraries")) ?? [];
  const libraryId = parameters.get("libraryId");
  const selectedStrategy = libraries
    .find((lib) => lib.id == libraryId)
    ?.strategies.find((i) => i.id == parameters.get("strategyId"));

  return (
    <div className="container-fluid">
      {selectedStrategy ? (
        <DashboardContent
          selectedStrategy={selectedStrategy}
          libraries={libraries}
          libraryId={libraryId}
        />
      ) : (
        <div>
          <h1>Strategy tester</h1>
          <p>
            Start new strategy by clicking create strategy
            <code>#content</code>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
