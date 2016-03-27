var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../models/db');
var LineItem = require("../models/lineitem").LineItem;

router.get('/create', function(req, res, next) {

  var description = req.query.description,
    category = req.query.category,
    amount = req.query.amount,
    date = req.query.date;

  var lineitem = new LineItem({ description: description, category: category, amount: amount, date:date });

  lineitem.save(function(err, savedLineItem) {
    if (err) return console.error(err);
    res.send(savedLineItem)
  });

});

router.get('/list', function(req, res, next) {

  LineItem.find(function(err, allLineItems) {
    if (err) return console.error(err);
    res.render('list', { data: allLineItems });
  });

});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
