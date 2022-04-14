const mongoose = require('mongoose');

require('../model/Post');
const Post = mongoose.model('posts');

exports.getIndex = (req, res, next) => {
  Post.find({
    status: 'published'
  })
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('index/index', {
        'posts': posts
      });
    })
    .catch((err) => {
      res.status(404).send();
    })
};
