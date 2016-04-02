var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../models/db');
var LineItem = require("../models/lineitem").LineItem;

router.get('/list', function(req, res, next) {

 res.render('list')

});

router.post('/create', function(req, res, next) {

  var description = req.body.description,
    category = req.body.category,
    amount = req.body.amount,
    date = req.body.date,
    user = req.session.passport.user.email;

  var lineitem = new LineItem({ description: description, category: category, amount: amount, date: date, user: user });

  lineitem.save(function(err, savedLineItem) {
    if (err) return console.error(err);
    res.send(savedLineItem)
  });

});

router.get('/listAll', function(req, res, next) {

  LineItem.
    find({
      user: req.session.passport.user.email
    }).exec(function(err, allLineItems) {
      if (err) return console.error(err);
      res.send(allLineItems);
    })

});

router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  LineItem.findByIdAndRemove(id, function(err, result){
    
     if (err){
      res.send(err);
     }
     
    LineItem.
    find({
      user: req.session.passport.user.email
    }).exec(function(err, allLineItems) {
      if (err) return console.error(err);
      res.send(allLineItems);
    })
    
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
