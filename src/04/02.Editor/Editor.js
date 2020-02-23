import React, {useState, useEffect, useCallback} from 'react'
import { getByDisplayValue } from '@testing-library/react';

// 👉 Todo: implement the useUndoableState hook.
// You need to debounce the the change handler, this is how you debounce:

// const handler = setTimeout(() => {
//   // do something...
// }, delay)
// clearTimeout(handler) // <- cleanup

function useUndoableState(initialValue, delay = 500) {
  const [body, setBody] = useState('')
  const [history, setHistory] = useState([]);
  
  const undo = () => {
    setBody(history[1] || '')
    setHistory(history.slice(1))
  }

  const reset = useCallback(() => {
    setBody(initialValue)
    setHistory([])
  }, [initialValue])

  const shouldUpdateHistory = history[0] !== body
  useEffect(() => {
    if(!body.length || !shouldUpdateHistory) {
      return
    }
    
    const handler = setTimeout(() => {
      setHistory([body, ...history])
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  })
  // 👉 Uncomment when ready:
  // return [value, setValue, undo]

  // 👉 (optional) Add reset function
  // 👉 should be created only once and refreshed only when initial value changes
  // Uncomment when ready:
  return [body, setBody, undo, reset]
}

export default function Editor() {
  // const [body, setBody] = React.useState('')
  // 👉 Replace the above with:
  const [body, setBody, undo, reset] = useUndoableState('')

  const changeBody = event => setBody(event.target.value)
  const submitForm = () => alert(JSON.stringify({ body }))

  return (
    <div className="editor">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            <form>
              <fieldset className="form-group">
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Write something"
                  value={body}
                  onChange={changeBody}
                />
              </fieldset>

              {/* 👉 Uncomment when ready: */}
              <button
                className="btn btn-lg btn-secondary mr-2"
                type="button"
                onClick={undo}
              >
                Undo
              </button>

              {/* 👉 (optional) Uncomment when ready: */}
              {<button
                className="btn btn-lg btn-secondary mr-2"
                type="button"
                onClick={reset}
              >
                Reset
              </button>}

              <button
                className="btn btn-lg btn-primary"
                type="button"
                onClick={submitForm}
              >
                Publish
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
