import React, {useRef, useEffect, useState} from 'react'

// you'll learn:
// managing hook dependencies and reducing them by passing function to setState
// how to achieve persistent reference to a mutable variable in function component


// TODO Create only one interval in the browser, when the timer is mounted and that is cleaned up when the timer is unmounted (you can unmount/mount using the `toggle timer rendering` button)
// TODO Create a "stop timer" button, that clears the interval and just renders the last state of the timer. (useRef)

// initial
export default function () {
  const [seconds, setSeconds] = useState(0)

  const intervalRef = useRef(null)

  useEffect(() => {
    console.log('interval effect')
    const id = setInterval(() => {
      console.log('running interval', id)
      setSeconds(sec => sec + 1)
    }, 1000);
    intervalRef.current = id

    return () => {
      console.log('cleaning interval', id)
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <p>{seconds}s</p>
      <button onClick={() => { clearInterval(intervalRef.current) }}>Stop timer</button>
    </>
  )
}
