exports.get404 = (req, res, next) => {
  // console.log(req.body, req.url);
  res.status(404).json('URL not found');
}