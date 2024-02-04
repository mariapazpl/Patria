if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
  
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require("path")

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
  
const users = [];
//const users = {};

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', checkNotAuthenticated, (req, res) => {
    res.render('index.ejs')
})
  
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
  
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
  
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
    res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

/*app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        // Use email as the key for the users dictionary
        users[req.body.email] = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }

    console.log(users)
});*/


app.get('/homepage', checkAuthenticated, (req, res) => {
    res.render('homepage.ejs', {name: req.user.name} )
}) 

app.get('/Marketplace', checkAuthenticated, (req, res) => {
    res.render('Marketplace.ejs')
})

app.get('/blog', checkAuthenticated, (req, res) => {
    res.render('blog.ejs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get('/logout', (req, res) => {
    req.logout((err) => {
        res.redirect('/')
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/homepage')
    }
    next()
}


app.listen(8080)
