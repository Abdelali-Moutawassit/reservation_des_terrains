const express = require("express")
const app = express()
const bodyParser = require('body-parser') 
const passport = require('passport') 
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./config/database')
const passportSetup = require('./config/passport-setup')


app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(express.static('uploads'))


app.use(session({
    secret:'abia',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))
app.use(flash())


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//bring passport
app.use(passport.initialize())
app.use(passport.session())

const users = require('./routes/user-routes')
app.use('/users',users)

const matches = require('./routes/match-routes')
app.use('/matches',matches)


app.get('/',(req,res)=>{
    res.redirect('/matches')
})



app.listen(3000,()=>
 console.log("app is working at port 3000")
)