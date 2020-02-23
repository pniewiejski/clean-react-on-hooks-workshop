import React, {useEffect, useState} from 'react'

export const Counter = function({saveCounterLocally, getInitialCounter, persistCounter}) {
  // your Counter implementation(s) here
  const [count, setCount] = useState(0)

  useEffect(() => {
    (async () => {
      const initialCounter = await getInitialCounter();
      setCount(initialCounter);
    })()
  }, [])

  useEffect(() => { saveCounterLocally(count) }, [count])

  useEffect(() => {
    persistCounter(count)
  }, [count])

  return <div>
    <p>{count}</p>
    <button onClick={() => { setCount(c => c + 1) } }>count</button>
  </div>
}
