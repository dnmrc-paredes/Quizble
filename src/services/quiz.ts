import { getToken } from './token'
import { getCurrentToken } from '../utils/helpers'

export const getQuizzes = async () => {
  let token

  try {
    token = getCurrentToken()

    if (!token) {
      throw new Error('No token')
    }

    const res = await fetch(`https://opentdb.com/api.php?amount=10&token=${token}`)
    const data = res.json()
    return data
  } catch (e) {
    token = await getToken()
    localStorage.setItem('token', token)
    const res = await fetch(`https://opentdb.com/api.php?amount=10&token=${token}`)
    const data = res.json()
    return data
  }
}
