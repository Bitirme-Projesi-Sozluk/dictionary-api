const express = require('express');

const postController = require('../controllers/posts');

const {
  ensureAuthenticated
} = require('../helpers/auth');

const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router.get('/', postController.getIndex);
router.get('posts ')

router.get('/add', ensureAuthenticated, postController.getAddPost);

router.get('/edit/:id', ensureAuthenticated, postController.getEditPost);

router.get('/delete/:id', ensureAuthenticated, postController.getDeletePost);

router.get('/show/:id', postController.getShowPost);

router.post('/', ensureAuthenticated, upload.single('header_img'), postController.postAddNewPost);


router.put('/:id', ensureAuthenticated, upload.single('header_img'), postController.putUpdatePost);

router.delete('/:id', ensureAuthenticated, postController.deleteSinglePost);

router.get('/myo', postController.getMYO);
router.get('/fakulte', postController.getFakulte);
router.get('/konservatuvar', postController.getKonservatuvar);
router.get('/noktalar',postController.getNoktalar);
router.get('/birimler',postController.getBirimler);

/* */

router.get('/birimler', postController.getBirimler);
router.get('/erasmus',postController.getErasmus);
router.get('/ortak-bolumler',postController.getOrtak);
router.get('/cevrim-ici-egitim', postController.getCevrimici);
router.get('/puan-ve-siralama',postController.getPuanSiralama);
router.get('/ulasim',postController.getBirimler);
router.get('/hyo',postController.getHemsirelik);

/* */

router.post('/comment/:id', postController.postComment);

router.delete('/comment/:id', ensureAuthenticated, postController.deleteComment);
module.exports = router;