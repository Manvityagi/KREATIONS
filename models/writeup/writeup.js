var mongoose = require("mongoose");
//MONGOOSE MODEL CONFIG
var writeupSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        
        ]
});

module.exports = mongoose.model("writeup",writeupSchema);