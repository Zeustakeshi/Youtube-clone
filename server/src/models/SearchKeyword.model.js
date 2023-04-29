import { model, Schema } from "mongoose";

const SearchKeywordSchema = new Schema({
    keyword: {
        type: String,
        required: true,
        unique: true,
    },
});

export default model("searchKeywords", SearchKeywordSchema);
