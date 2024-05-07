export const trimToWords = (str) => {
    let words = str.trim().split(/\s+/);
    if (words.length <= 12) {
        return str;
    }
    return words.slice(0, 12).join(' ');
}


export const getFirstLetter=(str)=> {
    console.log(str)
    if (str.length > 0) {
      return str[0];
    } else {
      return "N";
    }
  }