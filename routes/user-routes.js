const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require('../models/User')
const session = require('express-session');
const multer = require("multer")

router.get('/login',(req,res)=>{
    res.render('user/authentification')
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/matches',
    failureRedirect: '/users/login',
    failureFlash: true,
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/users/login');
        }

        // Définir le chemin de redirection en fonction du rôle de l'utilisateur
        let redirectPath = '/matches/pageIndex'; // Chemin par défaut pour les utilisateurs normaux
        if (user.role === 'admin') {
            redirectPath = '/matches/pageIndexA'; // Chemin pour les administrateurs
        }

        // Utiliser passport.authenticate avec les options successRedirect et failureRedirect
        passport.authenticate('local.login', {
            successRedirect: redirectPath,
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);

    })(req, res, next);
});

router.get('/logout', (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                console.error("Error during logout:", err);
                req.flash('error', 'An error occurred during logout.');
            } else {
                req.flash('success', 'You have been logged out successfully.');
            }
            res.redirect('/matches');
        });
    } catch (error) {
        console.error("Error during logout:", error);
        req.flash('error', 'An error occurred during logout.');
        res.redirect('/matches/pageIndex');
    }
});


module.exports = router;