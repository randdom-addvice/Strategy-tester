import React, { useState } from "react";
import "./CreateStrategy.css";

const CreateStrategy = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createStrategy() {
    if (!name.length) return;
    const startegies = JSON.parse(localStorage.getItem("strategies")) ?? [];
    const newStategy = {
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
    localStorage.setItem(
      "strategies",
      JSON.stringify([...startegies, newStategy])
    );
    setShowModal(false);
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
          <button class="ui-submit" onClick={createStrategy}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateStrategy;
