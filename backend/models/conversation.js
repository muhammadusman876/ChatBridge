const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            //default it would be empty array and later we will push our message message IDs when create the messages
            default:[],
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Conversation", conversationSchema)