var url = require('url');
/*
 * GET users listing.
 */

function isValidToken(token) {
  var current = new Date().getTime();
  var userToken = +token;
  if(!userToken) {
    return false;
  }

  var dif = (current-userToken) / 1000;
  if(dif > 0 && dif < 15) {
    return true;
  }

  return false;
}

exports.list = function(req, res){
  var url_parts = url.parse(req.url, true);
  var token = url_parts.query.token;

  if (isValidToken(token)) {
    res.send({
      value: "resource data"
    });
  } else {
    res.status(401);
    res.send({
      error: "not authorised"
    });
  }
};

exports.token = function(req, res){
  var token = new Date().getTime();
  res.send({
    token: token
  });
};