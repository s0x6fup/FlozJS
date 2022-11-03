function debugHeader(req, res, next) {
    if ( req.headers['x-debug-test'] ) {
        if ( req.headers['x-debug-test'] !== 'true' ) {
            return res.status(400).send('Incorrect debug value');
        }

        req.debug = true;
    } else {
        req.debug = false;
    }

    next();
}


function debugMessage(res, msg) {
    return res.status(400).send(msg)
}


module.exports = {
    debugHeader,
    debugMessage
}
