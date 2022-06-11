const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');

// import Post model
require('../model/Post');
const Post = mongoose.model('posts');

// import Admin model
require('../model/Admin');
const Admin = mongoose.model('admin');


exports.getLogIn = (req, res) => {
  res.render('admin/login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: false
  })(req, res, next);
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.getSignUp = (req, res) => {
  res.render('admin/signup');
};

exports.postSignUp = (req, res) => {
  Admin.findOne({
    'username': req.body.username
  })
    .then(user => {
      res.status(409).send('User already exists');
    })
    .catch((err) => {
      console.log(`Error: ${err.message} - admin.js`);
    });
};

exports.getAdminDashboard = (req, res) => {
  Post.find({})
    // handlebars issue
    .lean()
    .then((posts) => {
      res.render('admin/dashboard', {
        posts, layout: "adminMain"
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
};

exports.getAdminPosts = (req, res) => {
  Post.find({})
    .sort('-date')
    // handlebars issue
    .lean()
    .then((posts) => {
      res.render('admin/posts', {
        posts
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
};
