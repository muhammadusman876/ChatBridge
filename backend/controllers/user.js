const User = require("../models/user");

exports.getUserForSidebar = async (req, res) => {
    // try {
    //     //we are able to get the userId thanks to the protectedRoute
    //     const loggedInUserId = req.user._id

    //     //here we saying that find all user except the user user which is currently logged in ne = not equal.
    //     const filterUsers = await User.find({ _id: { $ne: loggedInUserId}}).select("-password");

    //     res.status(200).json(filterUsers)

    // } catch (error) {
    //     console.error("Error in getUsersForSidebar: ", error.message);
	// 	res.status(500).json({ error: "Internal server error" });
    // }

    try {
		const loggedInUserId = req.user._id;
        console.log(loggedInUserId)

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}