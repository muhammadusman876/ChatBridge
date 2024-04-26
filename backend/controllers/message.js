const Conversation = require("../models/conversation");
const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        // here we have set the userId to receiverId to differentiate between the sender and the receiver
        //for the development mode, we put this id in the url, it of the person whom we sending the message to
        const {id : receiverId} = req.params; // destructing instead of req.params.userId
        //in protected route we set req.user to user which is in database that's how we access to object Id
        const senderId = req.user._id;

        //here we find one conversation between the above user
        let conversation = await Conversation.findOne({
            //$all is mongoose syntax
            participants: { $all: [senderId, receiverId]},
        })

        //here we create the conversation as it could be first time of them message and conversation doesn't exists
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                //no need of "message = []", as in the schema we have set it to default array.
            })
        }

    //here we put the our data in object
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        //if newMessage was created successfully, then we push 
        if (newMessage) {
            //here we push id into message array in conversation
            conversation.message.push(newMessage._id);
        }

        //saving our message in database 
        // await conversation.save()
        // await newMessage.save()

        //more optimized way, this thing will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

exports.getMessage = async (req, res) => {
    try {
        
        //this is the user we are chatting with.
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        //here the this function doesn't give us just message array but actual array one by one.
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]},
        }).populate("message");// this is not a reference where we get id but this is actual messages

        //error handling, if the conversation doesn't exists then just create an empty array
        if (!conversation) {
            return res.status(200).json([])
        }

        const messages = conversation.message

        res.status(200).json(messages)


    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}