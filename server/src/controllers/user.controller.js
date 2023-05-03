import userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Register
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json("Missing data for this action!");
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    try {
        const newUser = await userService.register(
            username,
            email,
            hashPassword
        );
        const access_token = jwt.sign(
            { _id: newUser._id },
            process.env.ACCESS_TOKEN_SECRET_KEY
        );
        // res.cookie("access_token", access_token);
        const userForClient = newUser.toObject();
        delete userForClient.password;
        return res.status(200).json({
            access_token,
            user: userForClient,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
//Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Missing data for this action!");
    }

    try {
        const user = await userService.findUserByEmail(email);
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).json("Invalid password!");
        const access_token = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_TOKEN_SECRET_KEY
        );
        // res.cookie("access_token", access_token);
        const userForClient = user.toObject();
        delete userForClient.password;
        return res.status(200).json({
            access_token,
            user: userForClient,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//Update
export const update = async (req, res) => {
    const userID = req.userID;
    const { username, avatar, background } = req.body;
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (avatar) updatedFields.avatar = avatar;
    if (background) updatedFields.background = background;

    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json("Missing data for this action!");
    }

    try {
        const user = await userService.updateInfo(userID, updatedFields);
        return res.status(200).json({
            message: "User has been updated!",
            user,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

//Subscribe
export const subscribe = async (req, res) => {
    const userID = req.userID;
    const channelID = req.params.id;

    try {
        await userService.subscribe(userID, channelID);
        return res.json("Subscribe is success!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const unSubscribe = async (req, res) => {
    const userID = req.userID;
    const channelID = req.params.id;

    try {
        await userService.unSubscribe(userID, channelID);
        return res.json("UnSubscribe is success!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Get user
export const getUser = async (req, res) => {
    const userID = req.params.id;
    try {
        const user = await userService.findUserByID(userID);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
