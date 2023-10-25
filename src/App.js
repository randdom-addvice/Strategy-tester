import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Contents/Dashboard";
import Library from "./components/Contents/Library";
import CreateLibrary from "./components/CreateLibrary";
import CreateStrategy from "./components/CreateStrategy";
import Sidebar from "./components/Sidebar";

function App() {
  const parameters = new URLSearchParams(window.location.search);
  const [contentRender, setContentRender] = useState(
    parameters.get("view") ?? "library"
  );
  function renderView() {
    switch (contentRender) {
      case "dashboard":
        return <Dashboard />;
      case "library":
        return <Library changeView={changeView} />;
      default:
        return <Library changeView={changeView} />;
    }
  }

  function changeView(view) {
    const url = new URL(window.location);
    url.searchParams.set("view", view);
    window.history.pushState({}, "", url);
    setContentRender(view);
  }

  return (
    <div className="App">
      <div id="viewport">
        <Sidebar changeView={changeView} />
        <div id="content">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <CreateLibrary />
                </li>
              </ul>
            </div>
          </nav>
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;
