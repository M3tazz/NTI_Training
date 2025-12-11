function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong!";
  const details = err.details || null;
  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { errors: err.details }),
  });
}
module.exports = errorHandler;
