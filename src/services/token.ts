export const getToken = async () => {
  const { token } = (await fetch('https://opentdb.com/api_token.php?command=request').then(
    (result) => result.json()
  )) as { token: string }
  return token
}
