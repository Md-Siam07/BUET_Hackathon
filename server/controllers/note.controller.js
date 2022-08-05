const mongoose = require('mongoose');

const Note = mongoose.model('Note');

module.exports.getP = (req, res, next) => {
    Note.find({ userID: req._id },
        (err, note) => {
            if (note)
                return res.send(note);
            else
                console.log(err);
        }
    );
}

module.exports.postP = (req, res, next) => {
    var note = new Note();
    note.userID = req._id;
    note.lastUpdated = Date.now().toString();
    note.note = req.body.note;
    note.save( (err, doc) => {
        if(err)
        console.log(err)
        else
        res.send(doc);
    })
}