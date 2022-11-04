const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { get } = require('mongoose');
const { debugMessage } = require('../helpers/debug')


const registerPageHeader = {
    heading: 'Register',
    subheading: 'Welcome to Finance and Loans OrganiZation'
}


function login_form(req, res) {
    if ( typeof req.session == 'object' && req.session.userId ) {
        res.redirect('/')
    } else {
        res.render('loginForm', {
            heading: 'Login',
            subheading: 'Welcome back'
        });
    }
}


function login(req, res) {
    let errors = validationResult(req).array();

    if (errors.length > 0) {
        res.render('loginForm', {
            heading: 'Login',
            subheading: 'Welcome back',
            flash: errors[0].msg
        });
    }

    if (errors.length == 0) {
        User.findOne({ email : req.body.email })
        .then((user) => {
            if (user === null) {
                res.render('loginForm', {
                    heading: 'Login',
                    subheading: 'Welcome back',
                    flash: 'username or password are incorrect.'
                });
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
                    res.render('loginForm', {
                        heading: 'Login',
                        subheading: 'Welcome back',
                        flash: 'username or password are incorrect.'
                    });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.render('LoginForm', {
                heading: 'Login',
                subheading: 'Welcome back',
                flash: 'an error occured while logging in.'
            });
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

    if (errors.length > 0) {
        res.render('registerForm', {
            heading: 'Register',
            subheading: 'Welcome to Finance and Loans OrganiZation',
            flash: errors[0].msg
        });
    }

    if (errors.length == 0) {
        if (req.body.password != req.body.passwordConfirm) {
            res.render('registerForm', {
                heading: 'Register',
                subheading: 'Welcome to Finance and Loans OrganiZation',
                flash: 'password mismatch'
            });
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
                res.render('registerForm', {
                    heading: 'Register',
                    subheading: 'Welcome to Finance and Loans OrganiZation',
                    flash: 'could not register'
                });
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
