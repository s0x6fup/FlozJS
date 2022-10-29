const Comment = require('../models/comment');


function commentCreate(req, res) {
    if ( Object.keys(req.body).length === 0 ) { // use validator
        return res.status(400).send();
    }

    if ( req.body.author !== req.session.username ) {
        return res.status(400).send();
    }

    let comment = new Comment({
        post_id: req.params.id,
        data: JSON.stringify(req.body)
    });

    comment.save()
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('500');
    });
}


function commentsByPostId(req, res) {
    const id = req.params.id;

    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.redirect('/');
    }

    Comment.find({ post_id: id })
    .then(result => {
        let comments = [];
        result.forEach(cmnt => {
            comments.push(JSON.parse(cmnt.data));
        });
        console.log(comments);
        res.status(200).send(comments);
    })
    .catch((err) => {
        console.log(err);
    });
}


module.exports = {
    commentCreate,
    commentsByPostId
};
