import React from "react";

const Sidebar = ({ changeView }) => {
  return (
    <div id="sidebar">
      <header>
        <a href="#">Strategy Tester</a>
      </header>
      <ul className="nav">
        <li>
          <a onClick={() => changeView("dashboard")}>
            <i className="zmdi zmdi-view-dashboard"></i> Dashboard
          </a>
        </li>
        <li>
          <a onClick={() => changeView("library")}>
            <i className="zmdi zmdi-link"></i> Library
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
