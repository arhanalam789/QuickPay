import mongoose from "mongoose";


export interface ITokenBlacklist extends mongoose.Document {
  token: string;
}

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: [true, "Token must be unique"],
      index: true,
    }
  },
  {
    timestamps: true,
  }
);

tokenBlacklistSchema.index({ createdAt: 1 }, { unique: true, expireAfterSeconds: 60 * 60 * 24 * 3 }); // Tokens expire after 3 days  

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

export default TokenBlacklist;