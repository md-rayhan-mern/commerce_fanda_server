const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    console.error("ERROR " + err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.isOperational ? err.message : "Something want wrong",
    });
  }
};

export default globalError;
