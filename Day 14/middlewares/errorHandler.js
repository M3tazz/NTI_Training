function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const details = err.details || null;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(details && { errors: details }),
  });
}
module.exports = errorHandler;
