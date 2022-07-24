import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Question, QuestionItem } from './components/QuestionItem'
import { Options } from './components/Options'
import { getQuizzes } from './services/quiz'

const S = {
  Container: styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 50px 10px;
    @media screen and (min-width: 500px) {
      padding: 50px 20px;
    }
    form {
      max-width: 1000px;
      .finish-button {
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
  const [_totalScore, setTotalScore] = useState(0)
  const [category, setCategory] = useState('Any Category')
  const [difficulty, setDifficulty] = useState('Any Difficulty')
  const [type, setType] = useState('Any Type')

  useEffect(() => {
    const generateQuizzes = async () => {
      const data = (await getQuizzes({ category, difficulty, type })) as {
        results: Question[]
      }
      setQuizzes(data.results)
    }

    generateQuizzes()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }
  const handleDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
  }
  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const data = (await getQuizzes({ category, difficulty, type })) as {
      results: Question[]
    }
    setQuizzes(data.results)
  }

  return (
    <S.Container>
      <Options
        handleCategory={handleCategory}
        handleDifficulty={handleDifficulty}
        handleType={handleType}
        onSubmit={onSubmit}
      />
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
        <button className='finish-button' type='submit'>
          {' '}
          Finish{' '}
        </button>
        {/* {isSubmitted && (
          <p className='score'>
            {' '}
            Your score is {totalScore}/{quizzes.length}{' '}
          </p>
        )} */}
      </form>
    </S.Container>
  )
}

export default App
