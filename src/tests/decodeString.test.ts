// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest'
import { decodeString } from '../utils/helpers'

describe('Decode String Function', () => {
  it('It should convert unusual words to actual letters/letter', () => {
    expect(decodeString('Can&#039;t')).toBe("Can't")
  })
  it('It should convert unusual words to actual letters/letter', () => {
    expect(decodeString('Tom &amp; Jerry')).toBe('Tom & Jerry')
  })
  it('It should convert unusual words to actual letters/letter', () => {
    expect(decodeString('El &ntilde;ino')).toBe('El ñino')
  })
})
