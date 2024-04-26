const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        //this says this sender ID will be an ID from the user model/collection
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Message", messageSchema)