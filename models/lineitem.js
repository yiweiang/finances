var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var LineItemSchema = new Schema({
  description: String,
  category: String,
  amount: Number,
  date: Date,
  user: String
});

var LineItem = mongoose.model('LineItem', LineItemSchema);

var exports = module.exports = {};

exports.LineItem = LineItem;