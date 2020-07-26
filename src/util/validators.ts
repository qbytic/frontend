type ValidationResponse = [boolean, string?];

const MAX_NAME_LENGTH = 30;
export const sanitizeRegExp = /([^\w])/g;
export const clean = (x: string): string =>
  (x + "").replace(sanitizeRegExp, "");
function validateRequiredString(
  name: string,
  dontStripWhitespace?: boolean
): boolean {
  if (!name || !(dontStripWhitespace ? name : name.trim()).length) {
    return false;
  }
  return true;
}
function validateUsername(username: string): ValidationResponse {
  if (!validateRequiredString(username))
    return [false, "Username cannot be blank"];
  if (username.length > MAX_NAME_LENGTH)
    return [
      false,
      `Username cannot be longer than ${MAX_NAME_LENGTH} characters`,
    ];
  if (username.length < 4) return [false, "Username too short"];
  if (clean(username) !== username) return [false, "Invalid username"];

  return [true];
}
function validateName(name: string): ValidationResponse {
  if (!validateRequiredString(name)) {
    return [false, "Name cannot be blank"];
  }

  if (name.length > MAX_NAME_LENGTH) {
    return [false, `Name cannot be longer than ${MAX_NAME_LENGTH} characters`];
  }
  return [true];
}

function validatePassword(password: string): ValidationResponse {
  if (!validateRequiredString(password, true)) {
    return [false, "Password cannot be blank"];
  }
  if (password.length < 4) {
    return [false, "Password too short"];
  }
  return [true];
}
function validateEmail(email: string) {
  if (!validateRequiredString(email)) {
    return [false, "Email cannot be blank"];
  }
  return [true];
}

export { validateName, validatePassword, validateEmail, validateUsername };
