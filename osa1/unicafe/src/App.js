import { useState } from "react";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positive}</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const handleGood = () => {
    let newGood = good + 1;
    let newTotal = total + 1;
    let newFeedbacks = allFeedbacks.concat(1);
    let sum = newFeedbacks.reduce((acc, current) => {
      return acc + current;
    }, 0);
    let newAverage = sum / newTotal;
    let goodsAmount = newFeedbacks.filter((item) => item === 1).length;
    let newPositive = (goodsAmount / newTotal) * 100;
    setAllFeedbacks(newFeedbacks);
    setPositive(newPositive);
    setAverage(newAverage);
    setTotal(newTotal);
    setGood(newGood);
  };

  const handleNeutral = () => {
    let newNeutral = neutral + 1;
    let newTotal = total + 1;
    let newFeedbacks = allFeedbacks.concat(0);
    let sum = newFeedbacks.reduce((acc, current) => {
      return acc + current;
    }, 0);
    let newAverage = sum / newTotal;
    let goodsAmount = newFeedbacks.filter((item) => item === 1).length;
    let newPositive = (goodsAmount / newTotal) * 100;
    setAllFeedbacks(newFeedbacks);
    setPositive(newPositive);
    setAverage(newAverage);
    setTotal(newTotal);
    setNeutral(newNeutral);
  };

  const handleBad = () => {
    let newBad = bad + 1;
    let newTotal = total + 1;
    let newFeedbacks = allFeedbacks.concat(-1);
    let sum = newFeedbacks.reduce((acc, current) => {
      return acc + current;
    }, 0);
    let newAverage = sum / newTotal;
    let goodsAmount = newFeedbacks.filter((item) => item === 1).length;
    let newPositive = (goodsAmount / newTotal) * 100;
    setAllFeedbacks(newFeedbacks);
    setPositive(newPositive);
    setAverage(newAverage);
    setTotal(newTotal);
    setBad(newBad);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
