const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');


const roles = [
    'User',
    'Staff',
    'Administrator'
]


function usersList (req, res) {
    if ( req.session.role !== 'Staff' && req.session.role !== 'Administrator' ) {
        return res.status(403).send('');
    }

    User.find()
    .then((result) => {
        return res.render('manage', {
            heading: 'Manage users',
            users: result,
            roles: roles,
            session: req.session
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send('<h1>500</h1>');
    });
}


function updateRole(req, res) {
    let errors = validationResult(req).array();
    let userId = req.body.userId;
    let role = req.body.role;

    if ( req.session.role !== 'Staff' && req.session.role !== 'Administrator' ) {
        return res.status(403).send('');
    }

    if (errors.length > 0) {
        return res.redirect('/manage');
    }

    if ( !mongoose.Types.ObjectId.isValid(userId) ) {
        return res.redirect('/manage');
    }

    if ( role !== 'User' && role !== 'Staff' && role !== 'Administrator' ) {
        return res.redirect('/manage');
    }

    // staff attempting to upgrade to an administrator user
    if ( (!req.debug) && (role === 'Administrator' && req.session.role === 'Staff') ) {
        return res.redirect('/manage');
    }

    User.findOne({ _id: userId })
    .then((result) => {
        // if no results or staff attempting to change an administrator user
        if ( (result  === null) || ((!req.debug) && (result.role === 'Administrator' && req.session.role === 'Staff')) ) {
            return;
        }

        User.updateOne({ _id: userId }, { role: role })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });

    return res.redirect('/manage');
}


function deleteUserConfirm(req, res) {
    let errors = validationResult(req).array();
    let userId = req.body.userId;

    if ( req.session.role !== 'Administrator' ) {
        return res.status(403).send('');
    }

    if (errors.length > 0) {
        return res.redirect('/manage');
    }

    if ( !mongoose.Types.ObjectId.isValid(userId) ) {
        return res.redirect('/manage');
    }

    User.findOne({ _id: userId })
    .then((result) => {
        if ( result  === null ) {
            res.redirect('/manage');
        }

        if ( result  !== null ) {
            res.render('deleteUserConfirm', {
                heading: 'Are you sure?',
                subheading: 'For real for real for real?',
                user: result,
                session: req.session
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/manage');
    });
}


function deleteUser(req, res) {
    let errors = validationResult(req).array();
    let userId = req.body.userId;
    let confirm = eval(req.body.confirm); // we want true to be received as boolean and not as string

    if ( req.session.role !== 'Administrator' ) {
        return res.status(403).send('');
    }

    if (errors.length > 0) {
        return res.redirect('/manage');
    }

    if ( !mongoose.Types.ObjectId.isValid(userId) ) {
        return res.redirect('/manage');
    }

    if ( !confirm ) {
        return res.redirect('/manage');
    }

    console.log('passed test')

    User.findOne({ _id: userId })
    .then((result) => {
        if ( result  !== null ) {
            User.deleteOne({ _id: userId })
            .catch((err) => {
                console.log(err);
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });

    return res.redirect('/manage');
}


module.exports = {
    usersList,
    updateRole,
    deleteUserConfirm,
    deleteUser
}
