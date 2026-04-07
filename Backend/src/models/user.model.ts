import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mpin: string;
  systemUser:boolean;

  comparePassword(candidatePassword: string): Promise<boolean>;
  compareMpin(candidateMpin: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,   
    },
    mpin: {
      type: String,
      required: [true, "MPIN is required"],
      select: false,
    },
    systemUser: {
      type: Boolean,
      default: false,
      select: false,
    },
    
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: any) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified("mpin")) {
    const salt = await bcrypt.genSalt(10);
    this.mpin = await bcrypt.hash(this.mpin, salt);
  }
});  


userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
}; 

userSchema.methods.compareMpin = async function (
  candidateMpin: string
): Promise<boolean> {
  return bcrypt.compare(candidateMpin, this.mpin);
}; 



const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;