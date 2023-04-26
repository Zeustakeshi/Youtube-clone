import UserModel from "../models/User.model.js";

class UserService {
    async register(username, email, password) {
        const user = new UserModel({ username, email, password });
        await user.save();
        return user;
    }

    async findUserByEmail(email) {
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("User not found!");
        return user;
    }

    async updateInfo(userID, updatedFields) {
        const userUpdate = await UserModel.findByIdAndUpdate(
            userID,
            updatedFields,
            { new: true }
        );
        if (!userUpdate) throw new Error("User not found!");
        return userUpdate;
    }

    async getSubscribedUsers(userID) {
        try {
            const { subscribedUsers } = await UserModel.findById(userID, {
                subscribedUsers: 1,
            });
            return subscribedUsers;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async subscribe(userID, channelID) {
        const subscribedUsers = await this.getSubscribedUsers(userID);
        if (subscribedUsers?.includes(channelID)) {
            throw new Error("This channel has been subscribed!");
        }
        const userUpdate = await UserModel.findByIdAndUpdate(
            userID,
            { $push: { subscribedUsers: channelID } },
            { new: true }
        );

        const channelUpdate = await UserModel.findByIdAndUpdate(
            channelID,
            { $inc: { subscribers: 1 } },
            { new: true }
        );
        if (!channelUpdate) throw new Error("Channel not found!");
        if (!userUpdate) throw new Error("User not found!");
    }

    async unSubscribe(userID, channelID) {
        const subscribedUsers = await this.getSubscribedUsers(userID);

        if (!subscribedUsers?.includes(channelID)) {
            throw new Error("You are not subscribe this channel");
        }

        const userUpdate = await UserModel.findByIdAndUpdate(
            userID,
            { $pull: { subscribedUsers: channelID } },
            { new: true }
        );

        const channelUpdate = await UserModel.findByIdAndUpdate(
            channelID,
            { $inc: { subscribers: -1 } },
            { new: true }
        );
        if (!channelUpdate) throw new Error("Channel not found!");
        if (!userUpdate) throw new Error("User not found!");
    }
}

export default new UserService();
