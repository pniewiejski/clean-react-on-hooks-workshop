import React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import Editor from './Editor'

jest.useFakeTimers()

const runAllTimers = () => act(() => jest.runAllTimers())

// how to fire events: https://testing-library.com/docs/dom-testing-library/api-events
// https://github.com/testing-library/dom-testing-library/blob/master/src/events.js

describe(`Editor`, () => {
  it(`should change textarea value`, () => {
    // given
    const placeholder = 'Write something'
    const newValue = 'Something new'
    // Editor is rendered
    const {getByText, getByPlaceholderText} = render(<Editor/>)
    
    // when
    // searching textarea by placeholder
    const textArea = getByPlaceholderText(placeholder)
    
    // firing change event on the textarea with new value
    fireEvent.change(textArea, { target: { value: newValue } })
    
    // then
    // text area innerHTML is equal new value
    expect(textArea.innerHTML).toEqual(newValue)
  })

  it(`should undo the change on textarea value`, async () => {
    // given
    const placeholder = 'Write something'
    const newValue = 'Something new'
    const secondNewValue = 'Something new entirely'

    // Editor is rendered
    const {getByPlaceholderText, getByText} = render(<Editor/>)
    
    // searching textarea by placeholder
    const editorTextArea = getByPlaceholderText(placeholder)
    
    // firing change event on the textarea with new value
    fireEvent.change(editorTextArea, { target: { value: newValue }})
    // time is passing by :)
    runAllTimers()

    // firing change event on the textarea with second new value
    fireEvent.change(editorTextArea, { target: {value: secondNewValue }})
    // time is passing by :)
    runAllTimers()

    // when
    // searching undo button by text
    const undoButton = getByText('Undo')

    // clicking undo button
    fireEvent.click(undoButton)

    // then
    // text area innerHTML is equal new value
    expect(editorTextArea.innerHTML).toEqual(newValue)
  })
})
