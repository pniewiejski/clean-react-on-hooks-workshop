import React, { useState, useCallback, useEffect } from 'react';

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize())
  const handleResize = useCallback(() => setWindowSize(getSize()), [setWindowSize])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [handleResize])

  return windowSize
}

export default function WindowSize() {
  const windowSize = useWindowSize()

  return (
    <div>
      {windowSize.width} x {windowSize.height}
    </div>
  )
}
