// Create a new Error object with a custom message and status code
export default (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
