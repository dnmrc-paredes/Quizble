import React, { ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import { capitalFirstLetter } from '../../utils/helpers'

const S = {
  Container: styled.section`
    display: flex;
    width: 100%;
    max-width: 1000px;
    padding: 20px 0px;
    form {
      display: flex;
      justify-content: flex-start;
      select {
        margin-right: 10px;
        padding: 5px;
      }
      button {
        padding: 0 20px;
        height: 100%;
      }
    }
  `
}

const categories = [
  {
    id: 999,
    name: 'Any Category'
  },
  {
    id: 9,
    name: 'General Knowledge'
  },
  {
    id: 10,
    name: 'Entertainment: Books'
  },
  {
    id: 11,
    name: 'Entertainment: Film'
  },
  {
    id: 23,
    name: 'History'
  },
  {
    id: 30,
    name: 'Science: Gadgets'
  }
]

const difficulties = ['Any Category', 'easy', 'medium', 'hard']
const types = ['Any Type', 'multiple', 'boolean']

type OptionsProps = {
  // eslint-disable-next-line no-unused-vars
  handleCategory: (e: ChangeEvent<HTMLSelectElement>) => void
  // eslint-disable-next-line no-unused-vars
  handleDifficulty: (e: ChangeEvent<HTMLSelectElement>) => void
  // eslint-disable-next-line no-unused-vars
  handleType: (e: ChangeEvent<HTMLSelectElement>) => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: FormEvent) => void
}

export const Options = ({
  onSubmit,
  handleCategory,
  handleDifficulty,
  handleType
}: OptionsProps) => (
  <S.Container>
    <form onSubmit={onSubmit}>
      <div className='category-options'>
        <select onChange={handleCategory} name='category'>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='difficulty-option'>
        <select onChange={handleDifficulty} name='difficulty'>
          {difficulties.map((mode) => (
            <option key={mode} value={mode}>
              {capitalFirstLetter(mode)}
            </option>
          ))}
        </select>
      </div>
      <div className='type-option'>
        <select onChange={handleType} name='type'>
          {types.map((type) => (
            <option key={type} value={type}>
              {capitalFirstLetter(type)}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>Go</button>
    </form>
  </S.Container>
)
