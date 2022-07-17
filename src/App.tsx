import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getToken } from './services/token'
import { Question, QuestionItem } from './components/QuestionItem'
import { getQuizzes } from './services/quiz'

const S = {
  Container: styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 50px 20px;
    form {
      max-width: 1000px;
      button {
        margin: 0;
        margin-top: 15px;
        width: fit-content;
        padding: 10px 20px;
        width: 100px;
      }
    }
  `
}

function App() {
  const [quizzes, setQuizzes] = useState<Question[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const generateToken = async () => {
      const res = await getToken()
      return res
    }

    const generateQuizzes = async () => {
      const { results } = (await getQuizzes(await generateToken())) as { results: Question[] }
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
          <QuestionItem isSubmitted={isSubmitted} question={question} index={index} />
        ))}
        <button type='submit'> Finish </button>
      </form>
    </S.Container>
  )
}

export default App
