const bookModel=require('../models/book.model')


exports.getAllBooksController=(req,res,next)=>{
    bookModel.getAllBooks().then(books=>{
        res.render('books',{books:books, verifUser:req.session.userId})
    })
}

exports.getOneBookDetailsController=(req,res)=>{
    let id=req.params.id;
    bookModel.getOneBookDetails(id).then(book=>{
        res.render('details',{book:book, verifUser:req.session.userId})
    })
}

exports.getAddBookController =(req,res,next)=>{
    res.render('addbook',{verifUser:req.session.userId, Smessage:req.flash('Successmessage')[0], Emessage:req.flash('Errormessage')[0]})
}

exports.postAddBookController=(req,res,next)=>{
    // console.log(req.body)
    // console.log(req.file.filename)
    bookModel.postDataBookModel(req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.session.userId).then((msg)=>{
        req.flash('Successmessage',msg)
        res.redirect('/addbook')
    }).catch((err)=>{
        req.flash('Errormessage',err)
        res.redirect('/addbook')
    })
}

exports.getMybooksPage=(req,res,next)=>{
    bookModel.getmyBooks(req.session.userId).then((books)=>{
        res.render('mybooks',{verifUser:req.session.userId, mybooks:books})
    })  
}

exports.deleteBookController=(req,res,next)=>{
    let id=req.params.id  
    bookModel.deletebook(id).then((verif)=>{
        res.redirect('/mybooks')
    }).catch((err)=>{
        console.log('this error from catche :', err);
        res.redirect('/mybooks')
    })
}

exports.getMybookUpdatePage=(req,res,next)=>{
    let id=req.params.id
    bookModel.getPageUpdateBookModel(id).then((book)=>{
        res.render('updateBook', {bookUpdate:book, verifUser:req.session.userId, Smessage:req.flash('Successmessage')[0], Emessage:req.flash('Errormessage')[0]})
    })
}

exports.postUpdateBookContoller=(req,res,next)=>{
    if(req.file){
        bookModel.postUpdateBookModel(req.body.bookId, req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.session.userId).then((msg)=>{
            req.flash('Successmessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err)=>{
            req.flash('Errormessage',err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }else{
        bookModel.postUpdateBookModel(req.body.bookId, req.body.title, req.body.description, req.body.author, req.body.price, req.body.oldImage, req.session.userId).then((msg)=>{
            req.flash('Successmessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err)=>{
            req.flash('Errormessage',err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }
}
