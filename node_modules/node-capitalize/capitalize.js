module.exports = (str, words = false) => {
  if (!str || typeof str !== 'string') {
    return str
  }

  const capitalizeString = str.toLowerCase().split(' ')
  for (let i = 0; i < capitalizeString.length; i++) {
    if (words || i === 0) {
      capitalizeString[i] = capitalizeString[i].charAt(0).toUpperCase() + capitalizeString[i].substring(1)
    }
  }

  return capitalizeString.join(' ')
}
