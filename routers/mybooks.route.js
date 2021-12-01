const router=require('express').Router();
const bookController=require('../controllers/book.controller');
const multer=require('multer');
const GuardAuth=require('./guardAuth');


router.get('/', GuardAuth.isAuth, bookController.getMybooksPage);

router.get('/delete/:id', GuardAuth.isAuth, bookController.deleteBookController);

router.get('/update/:id', GuardAuth.isAuth, bookController.getMybookUpdatePage);


router.post('/update', GuardAuth.isAuth, multer({
      storage:multer.diskStorage({
          destination:function (req, file, cb) {cb(null, 'assets/uploads')},
          filename:function (req, file, cb) {cb(null, Date.now()+'-'+ file.originalname)}
      })
    }).single('image'), bookController.postUpdateBookContoller)




module.exports=router