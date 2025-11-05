export const success = (res, data, message = "OK") => {
  return res.status(200).json({
    code: 0,
    message,
    data,
  });
};

export const error = (res, message = "Internal Server Error", code = 500) => {
  return res.status(code).json({
    code,
    message,
  });
};
