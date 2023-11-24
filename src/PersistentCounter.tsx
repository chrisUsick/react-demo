import { useEffect, useState } from "react";

export type UsePersistentCounterValue = {
  count: number,
  setCount: (count: number) => void
}
export function usePersistentCounter(key: string, defaultValue: number): UsePersistentCounterValue {
  const [count, setCount] = useState<number>(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(count));
  }, [key, count]);
  return {count, setCount};

}

function PersistentCounter() {
  const { count, setCount } = usePersistentCounter("count", 0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default PersistentCounter