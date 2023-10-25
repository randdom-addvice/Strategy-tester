import React, { useState } from "react";
import "./Library.css";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateStrategy from "../CreateStrategy";

const StrategyCard = ({
  i,
  changeView,
  libraries,
  libraryId,
  setLibraries,
}) => {
  const [newName, setNewName] = useState(i.name);
  const [newDescription, setNewDescription] = useState(i.description);
  const colors = ["red", "blue", "cyan", "orange"];

  const handleUpdate = (strategy) => {
    const copiedLibrares = [...libraries];
    const foundLibraryIndex = copiedLibrares.findIndex(
      (library) => library.id === libraryId
    );
    const updatedStrategies = copiedLibrares[foundLibraryIndex].strategies.map(
      (s) => (s.id === strategy.id ? strategy : s)
    );
    copiedLibrares[foundLibraryIndex].strategies = updatedStrategies;
    localStorage.setItem("libraries", JSON.stringify(copiedLibrares));
    setLibraries(copiedLibrares);
  };

  return (
    <div class={`box ${colors[Math.floor(Math.random() * colors.length)]}`}>
      <div className="delete">
        <a
          onClick={() => {
            const copiedLibrares = [...libraries];
            const foundLibraryIndex = copiedLibrares.findIndex(
              (library) => library.id === libraryId
            );
            const filtered = copiedLibrares[
              foundLibraryIndex
            ].strategies.filter((x) => x.id !== i.id);
            copiedLibrares[foundLibraryIndex].strategies = filtered;
            localStorage.setItem("libraries", JSON.stringify(copiedLibrares));
            setLibraries(copiedLibrares);
          }}
        >
          <i className="fa fa-trash"></i>
        </a>
      </div>
      <div className="edit">
        <a
          onClick={() => {
            const updatedStrategy = {
              ...i,
              name: newName,
              description: newDescription,
            };
            handleUpdate(updatedStrategy);
          }}
        >
          <i className="fa fa-edit"></i>
        </a>
      </div>
      <h2>
        <input
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          value={newName}
        />
      </h2>
      <p>
        <textarea
          rows={4}
          onChange={(e) => setNewDescription(e.target.value)}
          // type="text"
          value={newDescription}
        />
      </p>
      <hr />
      <ul>
        <li>
          <strong>Trades:</strong> <span>{i.tradeDetails.totalTrades}</span>
        </li>
        <li>
          <strong>Win rate:</strong>{" "}
          <span>{i.tradeDetails.percentageWin}%</span>
        </li>
        <li>
          <strong>Profit Gain:</strong>{" "}
          <span>{i.tradeDetails.profitGain.toFixed(2)}%</span>
        </li>
      </ul>
      <a
        onClick={() => {
          window.history.replaceState(
            {},
            "",
            `/?libraryId=${libraryId}&strategyId=${i.id}&view=dashboard`
          );
          changeView("dashboard");
        }}
      >
        View
      </a>
    </div>
  );
};

const Library = ({ changeView }) => {
  const [libraries, setLibraries] = useState(
    JSON.parse(localStorage.getItem("libraries")) ?? []
  );
  return (
    <div className="Library">
      <div class="header">
        <h1>Libraries</h1>
      </div>
      <Accordion defaultActiveKey="0" alwaysOpen>
        {libraries.map((i, index) => (
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{i.name}</Accordion.Header>
            <Accordion.Body>
              <CreateStrategy id={i.id} />
              <div class="row1-container">
                {i.strategies.map((x) => (
                  <StrategyCard
                    i={x}
                    changeView={changeView}
                    libraries={libraries}
                    libraryId={i.id}
                    setLibraries={setLibraries}
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Library;

// import React from "react";
// import "./Library.css";

// const Library = ({ changeView }) => {
//   const startegies = JSON.parse(localStorage.getItem("strategies")) ?? [];
//   const colors = ["red", "blue", "cyan", "orange"];

//   // console.log(startegies);
//   return (
//     <div>
//       <div class="header">
//         <h1>Libraries</h1>
//       </div>
//       <div class="row1-container">
//         {startegies.map((i) => (
//           <div
//             class={`box ${colors[Math.floor(Math.random() * colors.length)]}`}
//           >
//             <div className="delete">
//               <a
//                 onClick={() => {
//                   const filtered = startegies.filter((x) => x.id !== i.id);
//                   localStorage.setItem("strategies", JSON.stringify(filtered));
//                   console.log(filtered);
//                 }}
//               >
//                 <i className="fa fa-trash"></i>
//               </a>
//             </div>
//             <h2>{i.name}</h2>
//             <p>{i.description}</p>
//             <hr />
//             <ul>
//               <li>
//                 <strong>Trades:</strong>{" "}
//                 <span>{i.tradeDetails.totalTrades}</span>
//               </li>
//               <li>
//                 <strong>Win rate%:</strong>{" "}
//                 <span>{i.tradeDetails.percentageWin}</span>
//               </li>
//             </ul>
//             <a
//               onClick={() => {
//                 window.history.replaceState(
//                   {},
//                   "",
//                   `/?selection=${i.id}&view=dashboard`
//                 );
//                 changeView("dashboard");
//               }}
//             >
//               View
//             </a>
//           </div>
//         ))}
//       </div>
//       {/* <div class="row2-container">
//         <div class="box orange">
//           <h2>Karma</h2>
//           <p>Regularly evaluates our talent to ensure quality</p>
//           <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Library;
