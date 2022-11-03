const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { get } = require('mongoose');
const { debugMessage } = require('../helpers/debug')


const registerPageHeader = {
    heading: 'Register',
    subheading: 'Welcome to Finance and Loans OrganiZation'
}


const loginPageHeader = {
    heading: 'Login',
    subheading: 'Welcome back'
}


function login_form(req, res) {
    if ( typeof req.session == 'object' && req.session.userId ) {
        res.redirect('/')
    } else {
        res.render('loginForm', loginPageHeader);
    }
}


function login(req, res) {
    let errors = validationResult(req).array();
    let flashPageHeader = loginPageHeader;

    if (errors.length > 0) {
        flashPageHeader.flash = errors[0].msg;
        res.render('loginForm', flashPageHeader);
    }

    if (errors.length == 0) {
        User.findOne({ email : req.body.email })
        .then((user) => {
            if (user === null) {
                flashPageHeader.flash = 'username or password are incorrect.';
                res.render('loginForm', flashPageHeader);
            }

            if (user !== null) {
                if (user.validPassword(req.body.password)) {
                    req.session.userId = user._id;
                    req.session.username = user.username;
                    req.session.email = user.email;
                    req.session.role = user.role;
                    res.redirect('/');
                } 
                
                if (!user.validPassword(req.body.password)) {
                    flashPageHeader.flash = 'username or password are incorrect.';
                    res.render('loginForm', flashPageHeader);
                }
            }
        })
        .catch((err) => {
            console.log(err);
            flashPageHeader.flash = 'an error occured while logging in.'
            res.render('LoginForm', flashPageHeader);
        });
    }
}


function register_form(req, res) {
    if ( typeof req.session == 'object' && req.session.userId ) {
        res.redirect('/')
    } else {
        res.render('registerForm', registerPageHeader);
    }
}


function register(req, res) {
    let errors = validationResult(req).array();
    let flashPageHeader = registerPageHeader;

    if (errors.length > 0) {
        flashPageHeader.flash = errors[0].msg;
        res.render('registerForm', flashPageHeader);
    }

    if (errors.length == 0) {
        if (req.body.password != req.body.passwordConfirm) {
            flashPageHeader.flash = 'password mismatch'
            res.render('registerForm', flashPageHeader);
        }

        if (req.body.password == req.body.passwordConfirm) {
            let user = new User({
                username: req.body.username,
                email: req.body.email,
                role: 'User'
            });

            user.setPassword(req.body.password);

            user.save()
            .then((result) => {
                res.redirect('/auth/login');
            })
            .catch((err) => {
                flashPageHeader.flash = 'an error occured while registering! If this issue proceeds, please contact our staff'
                console.log(err);
                res.render('registerForm', flashPageHeader);
            })
        }
    }
}


function logout(req, res) {
    if ( typeof req.session == 'object' && req.session.userId ) {
        req.session.destroy();
    }

    res.redirect('/');
}


function profile(req, res) {
    if ( typeof req.session == 'object' && req.session.userId ) {
        res.render('profile', {
            heading: req.session.username + '\'s',
            subheading: 'profile',
            session: req.session
        });
    } else {
        res.redirect('/');
    }
}


module.exports = {
    login_form,
    login,
    register_form,
    register,
    logout,
    profile
}
