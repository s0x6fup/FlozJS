const Post = require('../models/post');
const mongoose = require('mongoose');


function post_details(req, res) {
    const id = req.params.id;

    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.redirect('/');
    }

    Post.findById(id)
        .then((result) => {
            res.render('postDetails', {
                post: result,
                heading: result.heading,
                subheading: result.subheading,
                session: req.session
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}


function post_create_form(req, res) {
    res.render('post-form');
}


function post_create(req, res) {
    if (req.body.heading && req.body.heading != '' && req.body.text && req.body.text != '') {
        let post = new Post({
            heading: req.body.heading,
            text: req.body.text
        });

        post.save()
            .then((result) => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('500');
            });
    } else {
        res.redirect('/');
    }
}


function post_delete(req, res) {
    const id = req.params.id;

    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.redirect('/');
    }

    Post.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' });
        })
        .catch((err) => {
            console.log(err);
        });
}


function post_list(req, res) {
    Post.find()
    .then((result) => {
        res.render('postList', {
            posts: result,
            heading: 'Welcome',
            subheading: '... to our blog! Where we explain everything finance',
            session: req.session
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('500')
    });
}


module.exports = {
    post_details,
    post_create_form,
    post_create,
    post_delete,
    post_list
};