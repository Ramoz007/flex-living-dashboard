export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return "";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
};
