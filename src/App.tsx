import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Question, QuestionItem } from './components/QuestionItem'
import { getQuizzes } from './services/quiz'

const S = {
  Container: styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 50px 10px;
    @media screen and (min-width: 500px) {
      padding: 50px 20px;
    }
    form {
      max-width: 1000px;
      button {
        margin: 0;
        margin-top: 15px;
        width: fit-content;
        padding: 10px 20px;
        width: 100px;
        background-color: black;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
        text-transform: uppercase;
      }
      .score {
        margin-top: 15px;
      }
    }
  `
}

function App() {
  const [quizzes, setQuizzes] = useState<Question[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
    const generateQuizzes = async () => {
      const { results } = (await getQuizzes()) as { results: Question[] }
      setQuizzes(results)
    }

    generateQuizzes()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        {quizzes.map((question, index) => (
          <QuestionItem
            setTotalScore={setTotalScore}
            isSubmitted={isSubmitted}
            question={question}
            index={index}
            key={question.question}
          />
        ))}
        <button type='submit'> Finish </button>
        {isSubmitted && (
          <p className='score'>
            {' '}
            Your score is {totalScore}/{quizzes.length}{' '}
          </p>
        )}
      </form>
    </S.Container>
  )
}

export default App
