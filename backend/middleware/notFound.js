const notFound = (req, res, next) => {
  //   console.log(req.originalUrl);
  const error = new Error(
    `link to ${req.get("host")}${req.originalUrl} not found`
  );
  error.status = 405;
  return next(error);
};

export default notFound;
