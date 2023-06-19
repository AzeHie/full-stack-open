const Total = ({ parts }) => {
  const exercisesTotal = parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);

  return (
    <div>
      <p>
        <b>Total of {exercisesTotal} exercises</b>
      </p>
    </div>
  );
};

export default Total;
