import React from "react";
import "./Library.css";

const Library = ({ changeView }) => {
  const startegies = JSON.parse(localStorage.getItem("strategies")) ?? [];
  const colors = ["red", "blue", "cyan", "orange"];

  //   console.log(startegies);
  return (
    <div>
      <div class="header">
        <h1>Libraries</h1>
      </div>
      <div class="row1-container">
        {startegies.map((i) => (
          <div
            class={`box ${colors[Math.floor(Math.random() * colors.length)]}`}
          >
            <h2>{i.name}</h2>
            <p>{i.description}</p>
            <hr />
            <ul>
              <li>
                <strong>Trades:</strong>{" "}
                <span>{i.tradeDetails.totalTrades}</span>
              </li>
              <li>
                <strong>Win rate%:</strong>{" "}
                <span>{i.tradeDetails.percentageWin}</span>
              </li>
            </ul>
            <a
              onClick={() => {
                window.history.replaceState(
                  {},
                  "",
                  `/?selection=${i.id}&view=dashboard`
                );
                changeView("dashboard");
              }}
            >
              View
            </a>
          </div>
        ))}
      </div>
      {/* <div class="row2-container">
        <div class="box orange">
          <h2>Karma</h2>
          <p>Regularly evaluates our talent to ensure quality</p>
          <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default Library;
