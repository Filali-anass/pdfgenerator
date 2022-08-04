import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  email: string;
  image: string;
  hashedPassword: string;
  _id?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      requeired: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
