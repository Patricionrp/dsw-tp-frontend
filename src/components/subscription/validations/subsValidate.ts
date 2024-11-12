export const validateDescription = (description: string) => {
  if (!description || description.trim() === "") {
    return "Description is required.";
  }
  return "";
};

export const validatePrice = (price: string) => {
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return "Price must be a positive number.";
  }
  return "";
};

export const validateDuration = (duration: string) => {
  const parsedDuration = parseInt(duration);
  if (isNaN(parsedDuration) || parsedDuration <= 0) {
    return "Duration must be a positive number.";
  }
  return "";
};
