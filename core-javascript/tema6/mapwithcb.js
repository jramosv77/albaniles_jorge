function mapwithcb(array, callback) {
  if (!(array instanceof Array)) {
    return null;
  }
  else {
  return array.map(callback);
}
}
module.exports = mapwithcb;