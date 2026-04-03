import mongoose, { Document, Model } from "mongoose";

/**
 * Interface (Document type)
 */
export interface IAccount extends Document {
  user: mongoose.Types.ObjectId;
  status: "active" | "inactive" | "suspended";
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema
 */
const accountSchema = new mongoose.Schema<IAccount>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "INR",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Compound unique index (1 user = 1 account per status)
 */
accountSchema.index({ user: 1, status: 1 }, { unique: true });

/**
 * Model
 */
const Account: Model<IAccount> = mongoose.model<IAccount>(
  "Account",
  accountSchema
);

export default Account; 