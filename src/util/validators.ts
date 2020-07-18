type ValidationResponse = [boolean, string?];

const MAX_NAME_LENGTH = 30;

function validateRequiredString(
  name: string,
  dontStripWhitespace?: boolean
): boolean {
  if (!name || !(dontStripWhitespace ? name : name.trim()).length) {
    return false;
  }
  return true;
}

function validateName(name: string): ValidationResponse {
  if (!validateRequiredString(name)) {
    return [false, "Name cannot be blank"];
  }
  if (name.length > MAX_NAME_LENGTH) {
    return [false, "Name cannot be longer than 30 characters"];
  }
  return [true];
}

function validatePassword(password: string): ValidationResponse {
  if (!validateRequiredString(password, true)) {
    return [false, "Password cannot be blank"];
  }
  if (password.length > 4) {
    return [false, "Password must be atleast 4 characters long"];
  }
  return [true];
}
function validateEmail(email: string) {
  if (!validateRequiredString(email)) {
    return [false, "Email cannot be blank"];
  }
}

export { validateName, validatePassword, validateEmail };
