import Notification from "../db/models/notification.model.js";




export const getNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		const notifications = await Notification.find({ to: userId })
			.populate("from", "username profileImg")
			.sort({ createdAt: -1 }); // Sort by most recent

		await Notification.updateMany({ to: userId, read: false }, { $set: { read: true } });

		res.status(200).json(notifications);
	} catch (error) {
		console.error("Error in getNotifications:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		const result = await Notification.deleteMany({ to: userId });

		if (result.deletedCount === 0) {
			return res.status(404).json({ message: "No notifications found to delete" });
		}

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.error("Error in deleteNotifications:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
