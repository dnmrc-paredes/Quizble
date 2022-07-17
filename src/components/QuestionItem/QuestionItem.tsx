import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { decodeString } from '../../utils/helpers'

const S = {
  Container: styled.div<{ isSubmitted: boolean; isCorrect: boolean }>`
    padding: 20px;
    border: ${({ isCorrect, isSubmitted }) =>
      // eslint-disable-next-line no-nested-ternary
      `solid 1px ${isSubmitted ? (isCorrect ? '#34eb83' : '#f01010') : 'gainsboro'}`};
    margin: 10px 0;
    border-radius: 5px;
    @media screen and (min-width: 500px) {
      padding: 30px 20px;
    }
    .title {
      margin-bottom: 15px;
      font-size: 18px;
    }
    .info-answer {
      margin-top: 15px;
      .correct-answer {
        font-weight: 600;
      }
    }
  `,
  StyledRadio: styled.input<{ isSubmitted: boolean; isCorrect: boolean }>`
    background-color: ${({ isCorrect, isSubmitted }) =>
      // eslint-disable-next-line no-nested-ternary
      isSubmitted ? (isCorrect ? 'transparent' : 'green') : 'white'};
    margin-bottom: 8px;
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
  setTotalScore: Dispatch<SetStateAction<number>>
  // eslint-disable-next-line no-unused-vars
}

export const QuestionItem = ({
  question,
  index,
  isSubmitted,
  setTotalScore
}: QuestionItemProps) => {
  const [userAnswer, setUserAnswer] = useState('')

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
    if (question.correct_answer === e.target.value) {
      setTotalScore((prevTotalScore) => prevTotalScore + 1)
    }
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
        <div key={answer}>
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
