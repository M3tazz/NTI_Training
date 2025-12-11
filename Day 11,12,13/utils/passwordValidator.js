function isStrongPassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return regex.test(password);
}
module.exports = isStrongPassword;
