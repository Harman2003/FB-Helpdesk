export const validateAuth = (
  name: string,
  email: string,
  password: string
) => {
  const error = [
    "All fields must be filled !",
    "Invalid email error",
    "Password: 8+ chars, 1 capital, 1 special character",
  ];
  if (!name || !email || !password) {
    return error[0];
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=]).{8,}$/;
  const isValidPassword = passwordRegex.test(password);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);

  return !isValidEmail ? error[1] : !isValidPassword ? error[2] : "";
};
