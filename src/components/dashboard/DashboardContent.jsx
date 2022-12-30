import React, { useEffect, useState } from "react";
import Chart from "./Chart";

const DashboardContent = ({ selectedStrategy, strategies }) => {
  const [showMoreResult, setShowMoreResult] = useState(false);
  const [lossCountvalue, setLossCountValue] = useState(0.2);
  const [winCountvalue, setWinCountValue] = useState(0.4);
  const [sequenceSize, setSequenceSize] = useState(100);
  const [profitGain, setProfitGain] = useState(
    Number(selectedStrategy.tradeDetails.profitGain) ?? 0
  );
  const [lossCount, setLossCount] = useState(
    Number(selectedStrategy.tradeDetails.totalLosses) ?? 0
  );
  const [winCount, setWincount] = useState(
    Number(selectedStrategy.tradeDetails.totalWinnings) ?? 0
  );
  const [tradesSequence, setTradesSequence] = useState(
    selectedStrategy.tradeDetails.tradesSequence ?? []
  );
  const [growth, setGrowth] = useState(
    selectedStrategy.tradeDetails.growth ?? []
  );

  function getTradesSequenceAverage() {
    const newTradesSequence = [...tradesSequence];
    const sequence = [];
    const sequenceAverages = [];
    newTradesSequence.map((i) =>
      sequence.push(newTradesSequence.splice(0, sequenceSize))
    );
    sequence.forEach((i) => {
      sequenceAverages.push(
        Number(
          ((i.filter((i) => i === "green").length / i.length) * 100).toFixed(2)
        )
      );
    });
    const totalAverages = (
      sequenceAverages.reduce((acc, curr) => acc + curr, 0) /
      sequenceAverages.length
    ).toFixed(2);
    return {
      totalAverages,
      totalSequencies: sequenceAverages.length,
      sequenceSize,
    };
  }

  function getMaxConsecutive(def = "green") {
    let arr = selectedStrategy.tradeDetails.tradesSequence;
    let count = 0;
    let result = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === def) {
        count += 1;
        result = Math.max(result, count);
      } else {
        count = 0;
      }
    }
    return result;
  }

  function calculateProfitFactor() {
    const seqWin = selectedStrategy.tradeDetails.tradesSequence.filter(
      (i) => Math.sign(i) !== -1
    );
    const seqLoss = selectedStrategy.tradeDetails.tradesSequence.filter(
      (i) => Math.sign(i) === -1
    );
    const winSum = Math.round(seqWin.reduce((acc, curr) => acc + curr, 0));
    const lossSum = Math.abs(
      Math.round(seqLoss.reduce((acc, curr) => acc + curr, 0))
    );

    const winProb = Number(winCount / (lossCount + winCount).toFixed(1));
    const lossProb = Number(lossCount / (lossCount + winCount).toFixed(1));
    const avgProfit = Number((winSum / seqWin.length).toFixed(1));
    const avgLoss = Number((lossSum / seqLoss.length).toFixed(1));
    const profitFactor = ((winProb * avgProfit) / (lossProb * avgLoss)).toFixed(
      2
    );

    return { avgProfit, profitFactor };
  }

  useEffect(() => {
    console.log(calculateProfitFactor(), "temp");
  }, []);

  function log(win, logic) {
    if (win) {
      setWincount(logic === "add" ? winCount + 1 : winCount - 1);
      setTradesSequence([...tradesSequence, "green"]);
      setProfitGain((prev) =>
        logic === "add" ? prev + winCountvalue : prev - winCountvalue
      );
    } else {
      setLossCount(logic === "add" ? lossCount + 1 : lossCount - 1);
      setProfitGain((prev) =>
        logic === "add" ? prev - lossCountvalue : prev + lossCountvalue
      );
      setTradesSequence([...tradesSequence, "red"]);
    }
    if (logic !== "add") {
      setTradesSequence((prev) => {
        const newTrades = prev;
        newTrades.pop();
        return newTrades;
      });
    }
    setGrowth((prev) => [...prev, Number(profitGain.toFixed(2))]);
  }

  function documentHistory() {
    const totalTrades = lossCount + winCount;
    const totalLossesPercent = Math.round((lossCount / totalTrades) * 100);
    const totalWinningsPercent = Math.round((winCount / totalTrades) * 100);
    const percentageWin = Math.round((winCount / totalTrades) * 100);
    const newHistory = {
      totalTrades,
      totalLossesPercent,
      totalWinningsPercent,
      totalLosses: lossCount,
      totalWinnings: winCount,
      percentageWin,
      profitGain,
      tradesSequence,
      growth,
    };
    const updatedStrategies = strategies.map((i) =>
      i.id === selectedStrategy.id ? { ...i, tradeDetails: newHistory } : i
    );
    localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
  }

  function reset() {
    setLossCount(0);
    setWincount(0);
    setTradesSequence([]);
    setGrowth([]);
    const tradeDetails = {
      totalTrades: 0,
      totalLossesPercent: 0,
      totalWinningsPercent: 0,
      totalLosses: 0,
      totalWinnings: 0,
      percentageWin: 0,
      profitGain: 0,
      tradesSequence: [],
      growth: [],
    };

    const updatedStrategies = strategies.map((i) =>
      i.id === selectedStrategy.id ? { ...i, tradeDetails } : i
    );
    localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
  }

  return (
    <div className="dashboard">
      <h1>{selectedStrategy.name}</h1>
      <hr />
      <div className="grid">
        <div className="current-stat">
          <div className="result">
            <div className="stats">
              <div className="label">Winrate</div>
              <span>
                {Math.round((winCount / (lossCount + winCount)) * 100)}%
              </span>
            </div>
            <div className="stats">
              <div className="label">PnL.</div>
              <span>{profitGain.toFixed(2)}%</span>
            </div>
            <div className="stats">
              <div className="label">Total Trades</div>
              <span>{lossCount + winCount}</span>
            </div>
            <div className="stats">
              <div className="label">Wins/Losses</div>
              <span>
                {winCount}W / {lossCount}L
              </span>
            </div>
          </div>
          {showMoreResult && (
            <>
              <div className="sequcenceResult result">
                <div className="stats">
                  <div className="label">Total Avg</div>
                  <span>{getTradesSequenceAverage().totalAverages}</span>
                </div>
                <div className="stats">
                  <div className="label">Total Sequences</div>
                  <span>{getTradesSequenceAverage().totalSequencies}</span>
                </div>
                <div className="stats">
                  <div className="label">Sequence Size</div>
                  <span>
                    <input
                      type="number"
                      onChange={(e) => setSequenceSize(Number(e.target.value))}
                      value={sequenceSize}
                    />
                  </span>
                </div>
              </div>
              <div className="sequcenceResult result">
                <div className="stats">
                  <div className="label">Consec. Wins</div>
                  <span>{getMaxConsecutive("green")}</span>
                </div>
                <div className="stats">
                  <div className="label">Consec. Loss</div>
                  <span>{getMaxConsecutive("red")}</span>
                </div>
                <div className="stats">
                  <div className="label">Profit factor</div>
                  <span>{calculateProfitFactor().profitFactor}</span>
                </div>
              </div>
            </>
          )}

          <a onClick={() => setShowMoreResult((prev) => !prev)}>
            {showMoreResult ? "Show less" : "Show more"}
          </a>
        </div>
        <div className="inputs">
          <div className="input-grid">
            <div>
              <input
                onChange={(e) => setLossCountValue(Number(e.target.value))}
                value={lossCountvalue}
                type="number"
                placeholder="loss"
                min="0"
                step="any"
              />
              <button className="red" onClick={() => log(false, "add")}>
                - add loss
              </button>
              <button onClick={() => log(false, "subtract")}>- loss</button>
            </div>
            <div>
              <input
                onChange={(e) => setWinCountValue(Number(e.target.value))}
                value={winCountvalue}
                type="number"
                min="0"
                step="any"
                placeholder="profit"
              />
              <button className="green" onClick={() => log(true, "add")}>
                + add profit
              </button>
              <button onClick={() => log(true, "subtract")}>- profit</button>
            </div>
          </div>
        </div>
        <div className="buttons-grid">
          <button onClick={documentHistory} className="blue">
            Save
          </button>
          <button onClick={reset} className="veryDarkBlue">
            Reset
          </button>
        </div>
      </div>
      <div className="chart">
        <Chart growth={growth} />
      </div>
    </div>
  );
};

export default DashboardContent;
