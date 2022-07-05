import mongoose from "mongoose"

const tokenLogSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  refreshToken: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  },
})

export const TokenLog = mongoose.model("TokenLog", tokenLogSchema, "TokenLog")
