const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/User')


// saving user object in the session ...

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Register Strategy
// Utilisation de fonctions asynchrones et await
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            return done(null, false, req.flash('error', 'Passwords do not match'));
        } else {
            const user = await User.findOne({ email: username });
            if (user) {
                return done(null, false, req.flash('error', 'Email already used'));
            }
            if (!user) {
                // Créer un utilisateur
                let newUser = new User();
                newUser.email = req.body.email;
                newUser.userfirstname = req.body.userfirstname;
                newUser.usersecondename = req.body.usersecondename;
                newUser.tele=req.body.tele;

                // Vérifiez si le mot de passe est "admin" pour définir le rôle
                if (req.body.password === 'admin') {
                    newUser.role = 'admin';
                } else {
                    newUser.role = 'normal';
                }
                // Hasher le mot de passe et enregistrer l'utilisateur
                newUser.password = newUser.hashPassword(req.body.password);
                await newUser.save();
                return done(null, newUser, req.flash('success', 'User Added'));
            }
        }
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));


//login strategy

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        // Find user using Promises
        const user = await User.findOne({ email: username });

        if (!user) {
            return done(null, false, req.flash('error', 'user was not found'));
        }

        if (user.comparePassword(password, user.password)) {
            return done(null, user, req.flash('success', 'welcome back'));
        } else {
            return done(null, false, req.flash('error', 'Password is wrong'));
        }
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));

