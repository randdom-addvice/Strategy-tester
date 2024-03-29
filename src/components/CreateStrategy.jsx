import React, { useState } from "react";
import "./CreateStrategy.css";

const CreateStrategy = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createStrategy() {
    if (!name.length) return;
    const libraries = JSON.parse(localStorage.getItem("libraries")) ?? [];
    const newStrategy = {
      name,
      description,
      id: Date.now(),
      history: [],
      tradeDetails: {
        totalTrades: 0,
        totalLossesPercent: 0,
        totalWinningsPercent: 0,
        totalLosses: 0,
        totalWinnings: 0,
        percentageWin: 0,
        profitGain: 0,
        tradesSequence: [],
        growth: [],
      },
    };
    const foundLibraryIndex = libraries.findIndex(
      (library) => library.id === id
    );
    console.log(foundLibraryIndex);
    console.log(id);
    console.log(libraries);
    if (foundLibraryIndex !== -1) {
      libraries[foundLibraryIndex].strategies.push(newStrategy);
      localStorage.setItem("libraries", JSON.stringify(libraries));
    }
    setShowModal(false);
    window.location.reload();
  }
  return (
    <div>
      <a href="#" onClick={() => setShowModal(!showModal)}>
        Create strategy
      </a>
      {showModal && (
        <div class="ui-modal" autocomplete="off">
          <div class="ui-password">
            <input
              type="text"
              class="ui-password-input"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button class="ui-submit" onClick={createStrategy}>
              Submit
            </button>
            <button
              class="ui-submit cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStrategy;
