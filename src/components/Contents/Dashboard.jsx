import React from "react";
import DashboardContent from "../dashboard/DashboardContent";
import "./Dashboard.css";

const Dashboard = () => {
  const parameters = new URLSearchParams(window.location.search);
  const strategies = JSON.parse(localStorage.getItem("strategies")) ?? [];
  const selectedStrategy = strategies.find(
    (strategy) => strategy.id == parameters.get("selection")
  );

  // console.log(parameters.get("selection"));
  // console.log(selectedStrategy);
  // console.log(strategies);
  return (
    <div className="container-fluid">
      {selectedStrategy ? (
        <DashboardContent
          selectedStrategy={selectedStrategy}
          strategies={strategies}
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
