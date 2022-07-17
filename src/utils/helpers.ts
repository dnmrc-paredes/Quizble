export const decodeString = (str: string) =>
  str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&Aacute;/, 'Á')
