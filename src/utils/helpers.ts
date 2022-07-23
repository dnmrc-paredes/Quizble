export const decodeString = (str: string) =>
  str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&Aacute;/, 'Á')
    .replace(/&aacute;/, 'á')
    .replace(/&Acirc;/, 'Â')
    .replace(/&acirc;/, 'â')
    .replace(/74&ndash;/, '74-')
    .replace(/&ntilde;/, 'ñ')
    .replace(/&iacute;/, 'í')

export const getCurrentToken = () => localStorage.getItem('token')

export const capitalFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
