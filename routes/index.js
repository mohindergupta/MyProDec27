'use strict';

var express = require('express');
var router = express.Router();
var userSchema = require('../models/user');

// block chain const from here      
const fs = require('fs');
var reguser = require('../network/registerUser');
var invoketran = require('../network/invoke');
// block chain const end here

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Profile' });
});

router.post('/login', function(req, res, next) {
  res.render('userinfo', { title: 'Your Profile'});
});

router.post('/register', function(req, res, next) {
  res.render('register', {title: 'User Registration'});
  if (typeof req.body.loginid === 'undefined') 
      req.body.loginid=[];
  else {
    var user = new userSchema (
    { loginid: req.body.loginid,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      country: req.body.country,
      //date_of_birth: req.body.date_of_birth,
      user_type: req.body.user_type,
      email: req.body.email,
      phone: req.body.phone
      });
      user.save(function (err) {
        if (err) console.log(err);
      });
      
      // The blockchain code from here
      console.log('calling register user');
      var loginID = req.body.loginid;
      register (loginID, user);
      /*
      register({loginID
      }).then((results) => {
        transaction(loginID, user);
      }); */
    };
});
  /*        
  // invoke the main function, can catch any error that might escape
  main().then(() => {
    console.log('done');
  }).catch((e) => {
      console.log('Final error checking.......');
      console.log(e);
      console.log(e.stack);
      process.exit(-1);
  }); */
  //
/*
async function transaction (loginID, user) {
    console.log('inside async transaction function');
    console.log('login ID is', loginID);
    console.log('transaction data is ', user);
    let response = await invoketran(loginID, user);
    return(response);
    //console.log(response);
} */

function register (loginID, user) {
    console.log('inside async register function');
    console.log('login ID is ', loginID);
    console.log('the data is', user);
    let response = reguser(loginID, user);
    return(response);
    //console.log(response);
}
module.exports = router;