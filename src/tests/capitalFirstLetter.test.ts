// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest'
import { capitalFirstLetter } from '../utils/helpers'

describe('Capital First Letter Function', () => {
  it('should return the string with the first letter capitalized', () => {
    expect(capitalFirstLetter('hello')).toBe('Hello')
  })
  it('should return the string with the first letter capitalized', () => {
    expect(capitalFirstLetter('world')).toBe('World')
  })
})
