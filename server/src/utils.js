export const isAlphanumericRegex = (val) => {
  // ^ and $ is start and end of line respectively
  // [a-zA-Z0-9] is the character set to allow
  // + means one or more
  new RegExp("^[a-zA-Z0-9]+$").test(val);
};

export const isAlphaNumeric = (str) => {
  let code;

  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
};
