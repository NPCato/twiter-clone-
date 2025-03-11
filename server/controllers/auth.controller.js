import { tokenGenerator } from "../lib/rokenGenerator.js";
import User from "../db/models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";




export const signup = async (req, res) => {
	try {
		const { fullName, username, email, password } = req.body;

		if (!validator.isEmail(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ $or: [{ username }, { email }] });

		if (existingUser) {
			return res.status(400).json({ error: "Username or Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		tokenGenerator(newUser._id, res);

		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			email: newUser.email,
			followers: newUser.followers,
			following: newUser.following,
			profileImg: newUser.profileImg,
			coverImg: newUser.coverImg,
		});
	} catch (error) {
		console.error("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};




export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		 
		tokenGenerator(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
		});
	} catch (error) {
		console.error("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};




export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
