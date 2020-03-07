import {renderHook, act} from '@testing-library/react-hooks'
import {useUndoableState} from './Editor'
import { render } from 'react-dom'

jest.useFakeTimers()

const runAllTimers = () => act(() => jest.runAllTimers())

const renderTheHook = (initialValue = '') => {
  const {result, rerender} = renderHook(
    props => useUndoableState(props), { initialProps: initialValue }
  )

  return {
    getValue: () => result.current[0],
    setValue: value => result.current[1](value),
    undo: () => result.current[2](),
    reset: () => result.current[3](),
    rerender,
  }
}

describe(`useUndoableState`, () => {
  it(`should return initial value`, () => {
    // given
    const initialValue = '';

    // when
    // rendering hook
    const {getValue} = renderTheHook(initialValue)

    // then
    // hook value is equal intial value
    expect(getValue()).toEqual(initialValue)
  })

  it(`should set value`, () => {
    // given
    // hook is rendered with initial value
    const initialValue = '';
    const {getValue, setValue} = renderTheHook(initialValue)
    // new value
    const newValue = "new value"
    
    // when
    // setting new value
    act(() => setValue(newValue))
    
    // then
    // hook value is equal new value
    expect(getValue()).toEqual(newValue)
  })

  it(`should undo when the value was changed once`, () => {
    // given
    // hook is rendered with initial value
    const initialValue = ''
    const {getValue, setValue, undo} = renderTheHook(initialValue)
    
    // you set value once
    const newValue = 'new value'
    act(() => setValue(newValue))
    
    // time is passing by :)
    runAllTimers()
    
    // when
    // calling undo
    act(() => undo())

    // then
    // hook value is equal initial value
    expect(getValue()).toEqual(initialValue)
  })

  // ❗ IMPORTANT: ask me for advice if you reached this point

  it(`should undo when the value was changed twice`, () => {
    // given
    // hook is rendered with this shiny, custom renderer
    const initialValue = ''
    const {getValue, setValue, undo} = renderTheHook(initialValue)
    // you set value once
    const firstNewValue = 'new value'
    act(() => setValue(firstNewValue))
    
    // time is passing by :)
    runAllTimers()
    
    // you set value again
    const secondNewValue = 'another value'
    act(() => setValue(secondNewValue))
    
    // time is passing by :)
    runAllTimers()

    // when
    // calling undo
    act(() => undo())

    // then
    // hook value is equal previous value
    expect(getValue()).toEqual(firstNewValue)
  })

  it(`should work when trying to undo what's undoable`, () => {
    // given
    // hook is rendered with initial value
    const initialValue = ''
    const {getValue, undo} = renderTheHook(initialValue)

    // when
    // calling undo
    act(() => undo())

    // then
    // hook value is equal initial value
    expect(getValue()).toEqual(initialValue)
  })

  it(`should reset value`, () => {
    // given
    // hook is rendered with initial value
    const initialValue = 'initial value'
    const {getValue, setValue, reset} = renderTheHook(initialValue)
    
    // you set value once
    setValue('new value')
    // time is passing by :)
    runAllTimers()

    // when
    // calling reset
    act(() => reset())

    // then
    // hook value is equal initial value
    expect(getValue()).toEqual(initialValue)
  })

  it(`should reset value to updated initial value`, () => {
    // given
    // hook is rendered with initial value
    const initialValue = 'initial value'
    const {getValue, reset, rerender} = renderTheHook(initialValue)

    // when
    // rerendering hook with new initial value
    const newInitValue = 'new init value'
    rerender(newInitValue)
    // and calling reset

    act(() => reset())

    // then
    // // hook value is equal NEW initial value
    expect(getValue()).toEqual(newInitValue)
  })
})
