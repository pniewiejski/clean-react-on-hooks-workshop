import React, {useState, useContext} from 'react'

// initialize react context, with incrementation as default value
const CounterContext = React.createContext(state => state + 1)

const ContextAwareCounter = function() {
  // instructions:
  // take the state transition from context (useContext)
  // use context function to change the counter state
  const stateTransition = useContext(CounterContext)

  // you should consider: [someState, setSomeState] = useState() hook
  // hint: there is an other way to call the useState hook...
  const [count, setCount] = useState(0)

  return <div>
    <p>{count}</p>
    <button onClick={() => { setCount(stateTransition) }}>count</button>
  </div>
}

export { ContextAwareCounter, CounterContext }
