export const getQuizzes = async (token: string) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=10&token=${token}`)
  const data = res.json()
  return data
}
