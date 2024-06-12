export const trimToWords = (str) => {
  let words = str.trim().split(/\s+/);
  if (words.length <= 12) {
    return str;
  }
  return words.slice(0, 12).join(' ');
}


export const getFirstLetter = (str) => {
  console.log(str)
  if (str.length > 0) {
    return str[0];
  } else {
    return "N";
  }
}


export const truncateHTMLString = (htmlString) => {
  // Convert HTML string to plain text
  const wordLimit = 20
  const text = new DOMParser().parseFromString(htmlString, 'text/html').documentElement.textContent;

  // Split the text into words and extract the first wordLimit words
  const words = text.split(/\s+/);
  const truncatedWords = words.slice(0, wordLimit);

  // Join the truncated words and add ellipsis if the text was truncated
  const truncatedText = truncatedWords.join(' ');
  const ellipsis = words.length > wordLimit ? '...' : '';

  return truncatedText + ellipsis;
};