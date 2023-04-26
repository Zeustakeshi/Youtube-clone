import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (res) console.log("Connected database!");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
