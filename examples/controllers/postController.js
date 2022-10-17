const Post = require('../models/posts') // posts mongodb model

const post_details = (req, res) => {
    const id = req.params.id; // get id value from URI
    Post.findById(id)
    .then((result) => {
        res.render('singlePost', { post: result });
    })
    .catch((err) => {
        res.redirect('/');
    })
};

const post_create_form = (req, res) => {
    res.render('post-form');
};

post_create = (req, res) => {
    if (req.body.heading && req.body.heading != '' && req.body.text && req.body.text != '' ) {
        const post = new Post({
            heading: req.body.heading,
            text: req.body.text
        });
    
        post.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('500')
        });
    } else {
        res.redirect('/');
    }
};

post_delete = (req, res) => {
    const id = req.params.id; // get id value from URI
    
    Post.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/' }); // return JSON response to fetch telling to redirect main thread
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = {
    post_details,
    post_create_form,
    post_create,
    post_delete
};