export const validateTitle = (title: string) => {
  if (!title || title.trim() === "") {
    return "Title is required.";
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

export const validateTopics = (selectedTopics: any[]) => {
  if (selectedTopics.length === 0) {
    return "At least one topic must be selected.";
  }
  return "";
};
