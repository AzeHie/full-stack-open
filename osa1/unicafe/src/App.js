import { useState } from "react";

const Button = ({ handleFeedback, type, value }) => {
  return <button onClick={() => handleFeedback(value)}>{type}</button>;
};

const StatisticLine = ({ type, value }) => {
  return (
    <tr>
      <td>{type}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine type="good" value={good} />
            <StatisticLine type="neutral" value={neutral} />
            <StatisticLine type="bad" value={bad} />
            <StatisticLine type="all" value={total} />
            <StatisticLine type="average" value={average} />
            <StatisticLine type="positive" value={positive} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const handleFeedback = (type) => {
    let newFeedback;
    if (type === 1) {
      newFeedback = good + 1;
      setGood(newFeedback);
    }
    if (type === 0) {
      newFeedback = neutral + 1;
      setNeutral(newFeedback);
    }
    if (type === -1) {
      newFeedback = bad + 1;
      setBad(newFeedback);
    }
    let newTotal = total + 1;
    let newFeedbacks = allFeedbacks.concat(type);
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
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleFeedback={handleFeedback} type="good" value={1} />
      <Button handleFeedback={handleFeedback} type="neutral" value={0} />
      <Button handleFeedback={handleFeedback} type="bad" value={-1} />
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
