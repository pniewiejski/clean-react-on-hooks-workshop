import {renderHook, act} from '@testing-library/react-hooks'
import {fireEvent} from '@testing-library/react'
import {useWindowSize} from './WindowSize'
import { render } from 'react-dom'

describe(`useWindowSize`, () => {
  it(`should return with default resolution`, () => {
    // given
    const DEFAULT_DOM_RESOLUTION = [1024, 768]
    // desctructuring can break your spirit 👻

    // when
    // rendering hook
    const { result } = renderHook(() => useWindowSize())
    // then
    // [width, height] is equal DEFAULT_DOM_RESOLUTION
    expect(result.current.width).toEqual(DEFAULT_DOM_RESOLUTION[0])
    expect(result.current.height).toEqual(DEFAULT_DOM_RESOLUTION[1])
    // and there are no errors
    expect(result.error).toEqual(undefined)
  })

  it(`should return changed resolution when resizing`, () => {
    // given
    const newWidth = 1000;
    const newHeight = 800
    // hook is rendered
    const { result } = renderHook(() => useWindowSize())

    // when
    // firing window resize event
    window.innerWidth = newWidth
    window.innerHeight = newHeight
    fireEvent(window, new Event('resize'))

    // then
    // [width, height] is equal [newWidth, newHeight]
    expect(result.current.width).toEqual(newWidth)
    expect(result.current.height).toEqual(newHeight)
  })

  it(`should subscribe and unsubscribe to the 'resize' event only once`, () => {
    // given
    const addSpy = jest.spyOn(window, 'addEventListener')
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    // hook is rendered
    const { result, rerender, unmount } = renderHook(() => useWindowSize())

    // when
    // rerendering hook
    rerender()
    // unmounting hook
    unmount()

    // then
    // number of resize calls for add listener === 1
    const numberOfCallsForResizeAdd = addSpy.mock.calls.filter(call => call[0] === 'resize').length
    const numberOfCallsForResizeRemove = removeSpy.mock.calls.filter(call => call[0] === 'resize').length
    expect(numberOfCallsForResizeAdd).toEqual(1)
    expect(numberOfCallsForResizeRemove).toEqual(1)
    // number of resize calls for remove listener === 1
  })
})
