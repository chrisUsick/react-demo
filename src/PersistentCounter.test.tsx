
import { expect, test, describe } from 'vitest'
import PersistentCounter, { usePersistentCounter } from './PersistentCounter'
import { renderHook, act, render } from '@testing-library/react'

function sum(a: number, b: number) {
  return a + b
}

describe('PersistentCounter', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('hook works ', () => {
    const { result } = renderHook(() => usePersistentCounter('foo', 0))
    expect(result.current.count).toBe(0)
    act(() => {
      result.current.setCount(1)
    })
    expect(result.current.count).toBe(1)
  })

  test('component renders', () => {
    const { getByText } = render(<PersistentCounter />)
    expect(getByText('You clicked 0 times')).toContainHTML('You clicked 0 times')
  })
})