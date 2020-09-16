export function validateLogin(login) {
  const regEmail = /^([A-Za-zА-Яа-я0-9_\-\.])+\@([A-Za-zА-Яа-я0-9_\-\.])+\.([A-Za-zА-Яа-я]{2,4})$/
  const regLogin = /^[a-zA-Z0-9_]+$/

  return regLogin.test(login) || regEmail.test(login)
}

export function validatePassword(password) {
  const regPass = /^[a-zA-Z0-9 ]+$/

  return regPass.test(password)
}

export function validateJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}
