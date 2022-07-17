import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { decodeString } from '../../utils/helpers'

const S = {
  Container: styled.div<{ isSubmitted: boolean; isCorrect: boolean }>`
    padding: 30px 20px;
    border: ${({ isCorrect, isSubmitted }) =>
      // eslint-disable-next-line no-nested-ternary
      `solid 1px ${isSubmitted ? (isCorrect ? '#34eb83' : '#f01010') : 'gainsboro'}`};
    margin: 10px 0;
    .title {
      margin-bottom: 15px;
    }
    .info-answer {
      margin-top: 15px;
      .correct-answer {
        font-weight: 700;
      }
    }
  `,
  StyledRadio: styled.input<{ isSubmitted: boolean; isCorrect: boolean }>`
    background-color: ${({ isCorrect, isSubmitted }) =>
      // eslint-disable-next-line no-nested-ternary
      isSubmitted ? (isCorrect ? 'transparent' : 'green') : 'white'};
  `
}

export interface Question {
  category: string
  correct_answer: string
  difficulty: string
  question: string
  type: string
  incorrect_answers: string[]
}

export interface QuestionV2 {
  category: string
  correct_answer: string
  difficulty: string
  question: string
  type: string
  incorrect_answers: string[]
  isCorrect: boolean
}

type QuestionItemProps = {
  question: Question
  index: number
  isSubmitted: boolean
  // eslint-disable-next-line no-unused-vars
}

export const QuestionItem = ({ question, index, isSubmitted }: QuestionItemProps) => {
  const [userAnswer, setUserAnswer] = useState('')

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  return (
    <S.Container
      isCorrect={userAnswer === question.correct_answer}
      isSubmitted={isSubmitted}
      key={question.question}>
      <h2 className='title'>
        {`${index + 1}.)`} {decodeString(question.question)}
      </h2>
      {[...question.incorrect_answers, question.correct_answer].map((answer) => (
        <div>
          <S.StyledRadio
            type='radio'
            name={question.category}
            onChange={handleSelect}
            id={answer}
            value={answer}
            isCorrect={userAnswer === question.correct_answer}
            isSubmitted={isSubmitted}
            disabled={isSubmitted}
          />
          <label htmlFor={question.category}> {decodeString(answer)} </label>
        </div>
      ))}
      {isSubmitted && userAnswer !== question.correct_answer && (
        <p className='info-answer'>
          {' '}
          Correct Answer: <span className='correct-answer'> {question.correct_answer} </span>
        </p>
      )}
    </S.Container>
  )
}
