import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getToken } from '../services/token'
import { getQuizzes } from '../services/quiz'

const Hello = styled.p`
  background-color: red;
  padding: 2rem;
`

interface Questions {
  category: string
  correct_answer: string
  difficulty: string
  question: string
  type: string
  incorrect_answers: string[]
}

function App() {
  const [quizzes, setQuizzes] = useState<Questions[]>([])

  useEffect(() => {
    const generateToken = async () => {
      const res = await getToken()
      return res
    }

    const generateQuizzes = async () => {
      const { results } = (await getQuizzes(await generateToken())) as { results: Questions[] }
      console.log(setQuizzes(results))
    }

    generateQuizzes()
  }, [])

  return (
    <div>
      {quizzes.map((question, index) => (
        <div key={question.question}>
          <h1>
            {`${index + 1}.)`} {question.question}
          </h1>
        </div>
      ))}
    </div>
  )
}

export default App
