import { useEffect, useState } from "react";

function usePersistentState(key: string, defaultValue: number) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];

}

function PersistentCounter() {
  const [count, setCount] = usePersistentState("count", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default PersistentCounter