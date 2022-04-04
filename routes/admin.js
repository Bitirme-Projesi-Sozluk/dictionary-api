const express = require('express');

const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const adminControllers = require('../controllers/admin');

const router = express.Router();

const {
  ensureAuthenticated
} = require('../helpers/auth');

router.get('/login', adminControllers.getLogIn);

router.post('/login', adminControllers.postLogin);

router.get('/logout', ensureAuthenticated, adminControllers.getLogout);


router.get('/signup', adminControllers.getSignUp);

router.post('/signup', adminControllers.postSignUp);

router.get('/', ensureAuthenticated, adminControllers.getAdminDashboard);

router.get('/posts', ensureAuthenticated, adminControllers.getAdminPosts);

router.get('/pages', ensureAuthenticated, adminControllers.getAdminPages);

module.exports = router;