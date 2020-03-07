import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import WindowSize from './WindowSize'

describe(`WindowSize`, () => {
  it(`should render with default resolution`, () => {
    // given
    const DEFAULT_DOM_RESOLUTION = '1024x768'

    // when
    // rendering WindowSize
    const { getByText } = render(<WindowSize/>)
    // you search by default resolution text
    const text = getByText(DEFAULT_DOM_RESOLUTION)
    // then
    // the element is there
    expect(text).not.toEqual(null)
    // and there are diffrent kinds of api you could use (if you didn't know already)
    // https://testing-library.com/docs/react-testing-library/cheatsheet
  })

  it(`should render with changed resolution when resizing`, () => {
    // given
    const newWidth = 1000;
    const newHeight = 800
    const resolution = `${newWidth}x${newHeight}`
    // WindowSize is rendered
    const { getByText } = render(<WindowSize/>)
    
    // when
    // firing window resize event
    window.innerWidth = newWidth;
    window.innerHeight = newHeight;
    fireEvent(window, new Event('resize'))
    
    // then
    // when you search by new resolution text
    // the element is there
    expect(getByText(resolution)).not.toEqual(null)
  })
})

// REMINDER: learn how to `act`
