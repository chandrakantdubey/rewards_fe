export const getErrorMessageAndCode = (error) => {
  const { code, message } = error.response.data;
  return { code, message };
};
