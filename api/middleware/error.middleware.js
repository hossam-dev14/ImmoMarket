// Error handling middleware
export default function errorMiddlewar (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: statusCode,
    error: {
      message,
    },
  });
};