
const dotenv = require('dotenv')
dotenv.config()

const express= require('express')
const path = require('path')
const app= express()

//disable X-powered-by header
app.disable('x-powered-by')

const rate_limit = require('express-rate-limit')
const xss = require('xss-clean')
// const csrf = require('csurf')
const CryptoJS = require('crypto-js')
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const cookieSession = require('cookie-session')
const body_parser = require('body-parser')
const boxen = require('boxen')
// const helmet = require('helmet')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const { v4 : uuidv4 } = require('uuid')
const nocache = require('nocache')
const passport = require('passport')
const sanitize = require('mongo-sanitize')
const fs = require('fs')

const {print} = require('./helpers/getApiStack')

//models

//declare routes
const csrf = require('./routes/csrf')
const admin = require('./routes/auth')
const events = require('./routes/event')

const hbs = require('hbs')

// registerPartials for Admin
hbs.registerPartials(__dirname+'/views/partials/')
// registerPartials for User
//hbs.registerPartials(__dirname+'/views/user/partials/')

// To print Json object in HBS file using {{json this}}
hbs.registerHelper('json', function(obj) {
    return JSON.stringify(obj)
  })

// Set View Engine
app.set('view engine', 'hbs')

//Port
const PORT = 8000

let depth_limit = 2; //JSON parse depth 
let limit_depth = (obj, current_depth, limit) => {
    // traversing each key and then checking the depth
    for (const key in obj)
        if (obj[key] instanceof Object)
            if (current_depth + 1 === limit) {
                obj[key] = "[object Object]"
                console.log(boxen('external mongo injection suspected', { borderColor : 'red' }))
            }
            else limit_depth(obj[key], current_depth + 1, limit)
}

// middleware to prevent Mongo injection
app.use((req, res, next) => {
    limit_depth(req.body, 0, depth_limit)
    next()
})

// connect to DB
const db_string = process.env.MONGO_URI
const db_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const mongo_connection = mongoose.connect(db_string, db_options,
   () => {console.log(boxen('Database is connected ', {padding: 0, margin: 0, borderStyle: 'single', backgroundColor : "black", borderColor : "blue", borderStyle :"singleDouble"}))})

const sessionStore = new MongoStore ({
  // mongooseConnection : mongo_connection,
  // mongoUrl : db_string,
  url : db_string,
  collection : 'sessions'
})

//enable pre-flight
app.options('*', cors())

//Middlewaress
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

// app.set('trust proxy', true)

//create session
let express_session = {
  genid : req => {
    return uuidv4()
  },
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true,
  store : sessionStore,
  Proxy : true,
  cookie : {
    maxAge : 24 * 60 * 60 * 1000, //24hrs in a day -> 1hr/60min 1min/60sec 1s/1000ms
    secure : false
  },
  loggedIn : false
}

if (process.env.NODE_ENV === 'production') {
    express_session.cookie.secure = true  //in production serve cookies over https only
    express_session.saveUninitialized = false
}
  
const cors_options = {
  credentials : true
}

const limiter = rate_limit({
  windowMs : 1 * 30 * 1000,
  max : 100
})

app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

//login system middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/success', session(express_session))
app.use(express.json())
app.use(cookie_parser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(cors())

app.use(express.static(__dirname+'/public'))

//Middlewares
require('./routes/userAuth.js');
app.use('/api/csrf', csrf);
app.use('/api/auth', admin);
app.use('/api/event', events);
app.use(require('./routes'));
app.use(express.static('views/images'))

const api_stack = []
app._router.stack.forEach(print.bind(null, [], api_stack))

app.get('/node-admin/api', async(req, res) => {
    res.render('admin/api', { 'data' :  api_stack})
})

//serve static files
// app.use(express.static('client/build'))

// app.get('*', (req, res) =>{
//   // res.cookie('XSRF-TOKEN', req.csrfToken())
//   // fs.createReadStream(path.join(__dirname+'/client/build/index.html')).pipe(res)
//   res.sendFile(path.join(__dirname+'/client/build/index.html'))
// })



//logout api
app.get('/logout', function(req, res){
  
  req.logout()
  console.log("Logged out!!")
  return res.redirect('/')
})

//google login routes
app.get('/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

//callback route
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.cookie("user",req.user._id)
  res.redirect('/')
})

//facebook login routes
app.get('/facebook/login', passport.authenticate('facebook', { scope : 'email' } ))

//facebook callback route
app.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login' }), (req, res) => {
  res.cookie("user",req.user._id)
  res.redirect('/')
})




//set headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

//to prevent error - Uncaught SyntaxError: Unexpected token <
//nocache - to prevent cache of index.html (prevents error while serving static files)
app.use(nocache())

app.listen(PORT, function() {
    console.log(boxen('server running on ' + PORT, {padding: 0, margin: 0, borderStyle: 'single', backgroundColor : "black", borderColor : "blue", borderStyle :"singleDouble"}))
})   