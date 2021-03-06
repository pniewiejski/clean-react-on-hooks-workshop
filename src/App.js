import React, {useState} from 'react';

import Timer from './03/03.dependencies-mutable-state'
// import Description from './03/04.avoid-out-of-order-updates'

import WindowSize from './04/01.WindowSize/WindowSize';
// import FinalWindowSize from './04/01.WindowSize/final/WindowSize';
// import Editor from './04/02.Editor/Editor';
// import FinalEditor from './04/02.Editor/final/Editor';

import './App.css';

function App() {
  const [renderTimer, setRenderTimer] = useState(true)

  return (
    <div className="App">
      <section>
        <h2>Dependencies & persistent mutable state</h2>
        <p>
          see the logs of our `Timer` in developers console<br/>
          you will notice that even though we set interval to be ran every second, new intervalId is created every time we change `seconds` state<br/>
          because last interval is cleared before new render is performed and useEffect is called the second time
        </p>
        <h3>Task1:</h3>
        <p>
          Create only one interval in the browser, when the timer is mounted and that is cleaned up when the timer is unmounted (you can unmount/mount using the `toggle timer rendering` button)
        </p>
        <h3>Task2:</h3>
        <p>
          Create a "stop timer" button, that clears the interval and just renders the last state of the timer.<br/>
          hint: you need a way to store the id between consecutive re-renders
        </p>
        <button onClick={() => setRenderTimer(render => !render)}>toggle timer rendering</button>
        {renderTimer && <Timer/>}
      </section>

      {/* TODO Uncomment later */}
      {/* <section>
        <h2>Avoid out of order updates</h2>
        <p>
          Imagine you are getting data from backend (asynchronously) whenever some prop changes.<br/>
          Depending on the frequency of changes and request time, you can run into a situation where earlier response takes a LONG time and later response finishes early and is rendered.<br/>
          In this situation, earlier response will override the later (correct) state when it finishes.<br/>
          Consider this example: 3 items that are rendered after 3 different timeouts to allow you to simulate a situation like that
        </p>
        <h3>Task:</h3>
        <p>
          Change the useEffect hook implementation to ignore state update of earlier response if a new request was made.
        </p>
        <Description />
      </section> */}
    </div>
  );
}

export default App;
