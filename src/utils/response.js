class ApiResponse {
  static success(res, statusCode = 200, message, data = null, meta = null) {
    if (meta === null) {
      return res.status(statusCode).json({
        status: "success",
        message: message,
        data: data,
      });
    } else if (data === null) {
      return res.status(statusCode).json({
        status: "success",
        message: message,
        meta: meta,
      });
    } else if (meta === null && data === null) {
      return res.status(statusCode).json({
        status: "success",
        message: message,
      });
    } else {
      return res.status(statusCode).json({
        status: "success",
        message: message,
        data: data,
        meta: meta,
      });
    }
  }
}

module.exports = ApiResponse;
