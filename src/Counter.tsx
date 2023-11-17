import { useState } from "react";

function Counter( props: { initialCount: number } ) {
  const [count, setCount] = useState(props.initialCount)
  return (
    <div>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </div>
  )
}

export default Counter