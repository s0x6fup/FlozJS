const Contact = require('../models/contact');
const { validationResult } = require('express-validator')
const { hasSpecialChars } = require('../helpers/validate');


function contactForm(req, res) {
    res.render('contactForm', {
        heading: 'Contact',
        session: req.session
    });
}


function messagePage(req, res) {
    if ( req.session.role !== 'Staff' && req.session.role !== 'Administrator' ) {
        return res.status(403).send('');
    }

    res.render('messagePage', {
        heading: 'Messages',
        session: req.session
    });
}


function messageCreate(req, res) {
    let errors = validationResult(req).array();

    if ( errors.length > 0 ) {
        return res.render('contactForm', {
            heading: 'Contact',
            flash: errors[0].msg,
            session: req.session
        });
    }

    if ( hasSpecialChars(req.body.message) ) {
        delete req.body.message;
    }

    let contact = new Contact({
        data: JSON.stringify(req.body)
    });

    contact.save()
    .then((result) => {
        return res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send('500');
    });
}


function messageList(req, res) {
    if ( req.session.role !== 'Staff' && req.session.role !== 'Administrator' ) {
        return res.status(403).send('');
    }

    Contact.find()
    .then(result => {
        let messages = [];
        result.forEach(message => {
            messages.push(JSON.parse(message.data));
        });
        res.status(200).send(messages);
    })
    .catch((err) => {
        console.log(err);
    });
}


module.exports = {
    contactForm,
    messageCreate,
    messageList,
    messagePage
};
