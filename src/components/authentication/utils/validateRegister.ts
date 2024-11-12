export function validateRegister(userData: any) {
  const errors: any = {};
  if (!userData.dni) {
    errors.dni = ["DNI is required"];
  } else if (!/^\d{1,8}$/.test(userData.dni)) {
    errors.dni = ["DNI must be a number with no more than 8 digits"];
  }
  if (!userData.name) {
    errors.name = ["Name is required"];
  }

  if (!userData.surname) {
    errors.surname = ["Surname is required"];
  }

  if (!userData.email) {
    errors.email = ["Email is required"];
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = ["Email is not valid"];
  }

  if (!userData.password) {
    errors.password = ["Password is required"];
  } else if (userData.password.length < 8) {
    errors.password = ["Password must be at least 8 characters long"];
  }

  return errors;
}
