const mongoose = require('mongoose');
// import Post model
require('../model/Post');
const Post = mongoose.model('posts');


exports.getIndex = (req, res, next) => {
  Post.find({})
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('index', {
        'posts': posts
      });
    })
    .catch((err) => {
      res.status(404);
    })
};



exports.getAddPost = (req, res) => {
  res.render('post/add', { layout: "adminMain" });
};

exports.getEditPost = (req, res) => {
  Post.findById(req.params.id)
    .then((data) => {
      const post = data.toObject();
      res.render('post/edit', {
        post, layout: "adminMain"
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
};

exports.getDeletePost = (req, res) => {
  Post.findById(req.params.id)
    .then((data) => {
      console.log(data);
      // handlebars issue
      const post = data.toObject();
      res.render('post/delete', {
        post, layout: "adminMain"
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
};

exports.getShowPost = (req, res) => {
  Post.findById(req.params.id)
    .then((data) => {
      const post = data.toObject();
      res.render('post/show', {
        'post': post
      });
    })
    .catch((err) => {
      console.log(`Error1: ${err.message}`);
      res.status(404).render('post/404');
    });
};


exports.postAddNewPost = async (req, res) => {

  const post = new Post({
    'title': req.body.title,
    'body': req.body.body,
    'category': req.body.category ? req.body.category.toLowerCase() : 'ALL',
    'status': req.body.status
  });

  post
    .save()
    .then((doc) => {
      res.redirect('/admin/posts');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

exports.putUpdatePost = async (req, res) => {
  const postId = req.params.id;

  const updatedTitle = req.body.title;
  const updatedbody = req.body.body;
  const updatedcategory = req.body.category;
  const updatedstatus = req.body.status;
  const image = req.file;


  Post.findById(postId)
    .then(async post => {
      post.title = updatedTitle;
      post.body = updatedbody;
      post.category = updatedcategory;
      post.status = updatedstatus;

      return post.save()
        .then(result => {
          console.log('Post Updated Sucessfully');
          res.redirect('/admin/posts');
        })
    }
    )
    .catch(err => {
      console.log(`Error : ${err}`);
      res.redirect('/');
    });
};



exports.getMYO = (req, res) => {
  Post.find({
    category: 'MYO'
  })
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('post/myo', {
        'posts': posts
      });
      console.log()
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send();
    })
};

exports.getFakulte = (req, res) => {
  Post.find({
    category: 'Fakulte'
  })
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('post/fakulte', {
        'posts': posts
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send();
    })
};
exports.getNoktalar = (req, res) => {
  Post.find({
    category: 'Noktalar'
  })
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('post/noktalar', {
        'posts': posts
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send();
    })
};

exports.getBirimler = (req, res) => {
  Post.find({
    category: 'Birimler'
  })
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('post/birimler', {
        'posts': posts
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send();
    })
};

exports.getKonservatuvar = (req, res) => {
  Post.find({
    category: 'Konservatuvar'
  })
    .sort('-date')
    .lean()
    .then((posts) => {
      res.render('post/konservatuvar', {
        'posts': posts
      });
      console.log()
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send();
    })
};

exports.deleteSinglePost = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then(post => {

      return Post.deleteOne({
        _id: postId
      });
    })
    .then(() => {
      console.log('Post deleted successfully');
      res.redirect('/admin/posts');
    })
    .catch((err) => {
      res.status(500).send();
    });
};

exports.postComment = (req, res) => {
  const newComment = {
    commentBody: req.body.commentBody,
    commentUser: {
      name: req.body.name,
      email: req.body.email
    }
  }
  Post.findOneAndUpdate({
    _id: req.params.id
  }, {
    $push: {
      comments: {
        $each: [newComment],
        $position: 0
      }
    }
  })
    .then((post) => {
      res.redirect(`/posts/show/${post.id}`);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
      res.status(404).send();
    });
};

exports.deleteComment = (req, res) => {
  Post.findOneAndUpdate({
    _id: req.params.id
  }, {
    $pull: {
      comments: {
        _id: req.query.c_id
      }
    }
  })
    .then((post) => {
      res.redirect(`/posts/show/${post.id}`);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
      res.status(500).send();
    });
};