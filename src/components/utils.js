export function numberFormat(number) {
  return new Intl.NumberFormat("ko-KR", {
    maximumSignificantDigits: 3,
  }).format(number);
}

/**
 * @param {*} number
 * @returns
 */
export function phoneNumberToStringFormat(number) {
  let majorNumber = number.substr(0, 3);
  let midNumber = number.substr(3, 4);
  let lastNumber = number.substr(7, 4);

  return majorNumber + "-" + midNumber + "-" + lastNumber;
}

/**
 * @param {*} email
 * @returns
 */
export function emailValidation(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return email;
  }

  return "email validation error";
}

export function elementValidationCheck(object) {
  if (object === undefined || object === "") return false;
  return true;
}
