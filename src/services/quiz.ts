import { getToken } from './token'
import { getCurrentToken } from '../utils/helpers'

type GetQuizzesParams = {
  category?: string
  difficulty?: string
  type?: string
}

export const getQuizzes = async ({ category, difficulty, type }: GetQuizzesParams) => {
  let token

  try {
    token = getCurrentToken()

    if (!token) {
      throw new Error('No token')
    }

    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&token=${token}${
        category !== 'Any Category' ? `&category=${category}` : ''
      }${difficulty !== 'Any Difficulty' ? `&difficulty=${difficulty}` : ''}${
        type !== 'Any Type' ? `&type=${type}` : ''
      }`
    )
    const data = res.json()
    return data
  } catch (e) {
    token = await getToken()
    localStorage.setItem('token', token)
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&token=${token}${
        category !== 'Any Category' ? `&category=${category}` : ''
      }${difficulty !== 'Any Difficulty' ? `&difficulty=${difficulty}` : ''}${
        type !== 'Any Type' ? `&type=${type}` : ''
      }`
    )
    const data = res.json()
    return data
  }
}
