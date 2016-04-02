const _ = require('lodash');

var addLocals = function(locals) {
  this.locals = _.extend(this.locals, locals);
};

module.exports = function(req, res, next) {
  res = _.extend(res, { addLocals: addLocals });
  return next();
};
