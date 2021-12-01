const bookController = require('../controllers/book.controller');
const routerAuth = require('./auth.route');
const router = require('express').Router();
const GuardAuth = require('./guardAuth');
const multer = require('multer');


router.get('/', GuardAuth.isAuth, bookController.getAllBooksController);

router.get('/:id', GuardAuth.isAuth, bookController.getOneBookDetailsController);


routerAuth.get('/addbook', GuardAuth.isAuth, bookController.getAddBookController);

routerAuth.post('/addbook', multer({storage:multer.diskStorage({
                        destination:function (req, file, cb) {cb(null, 'assets/uploads')},
                        filename:function (req, file, cb) {cb(null, Date.now()+'-'+ file.originalname )}})
                }).single('image'),
        GuardAuth.isAuth, bookController.postAddBookController);


module.exports = router
