import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [missionCompleted, setMissionCompleted] = useState(false);

  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 5) setMissionCompleted(true);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      if (newCount === -5) setMissionCompleted(true);
      return newCount;
    });
  };

  return (
    <div>
      <h2>Counter App</h2>
      <p>{count}</p>
      {missionCompleted ? (
        <p>Kamu menyelesaikan misi 🎉</p>
      ) : (
        <>
          <button onClick={handleDecrement}>➖</button>
          <button onClick={handleIncrement}>➕</button>
        </>
      )}
    </div>
  );
};

export default Counter;
