const express=require('express')
const path=require('path')
const routerHome=require('./routers/home.route')
const routerAuth=require('./routers/auth.route')
const routerBook=require('./routers/book.route')
const routeMybooks=require('./routers/mybooks.route')
const routeContact=require('./routers/contact.route')
const routeAbout=require('./routers/about.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')
//For Error Handler
const {ServerError}=require('./util')
const logger = require('npmlog')

const app=express()


app.use(express.static(path.join(__dirname,'assets')))

app.set('view engine','ejs')
app.set('views','views')

var Store=new MongoDbStore({
    uri:'mongodb://localhost:27017/library',
    collection:'sessions'
}) 
app.use(flash())
app.use(session({
    secret:'this is my secret key',
    // cookie: { maxAge: 60000 }, //value in milli second | by default cookie expired when browser closed
    store:Store,
    resave: true,
    saveUninitialized: true
}))

app.use('/',routerHome);

app.use('/',routerAuth);

app.use('/books',routerBook);

app.use('/',routeContact);

app.use('/',routeAbout);

app.use('/mybooks',routeMybooks);

app.get('/dashboard', (req,res,next)=>{
    res.render('dashboard')
});

app.get('/tables', (req,res,next)=>{
    res.render('tables')
});

//Handler 404
app.use('*', (req, res, next)=>{
    // res.status(404).json({message:'NOT_FOUND'});
    // next({
    //     message: new Error('NOT_FOUND'),
    //     status: 404
    // });

    next(new ServerError('NOT_FOUND', 404));
})

//Error Handler
app.use((err, req, res, next)=>{
    logger.info('Custom Server Error', err.message);
    if (!err.status) {
        logger.error(err);
        process.exit(0);
    }
    res.status(err.status).json({
        message:err.message,
        status:err.status
    })
})


app.listen(3000,()=>console.log('server run in port 3000'))