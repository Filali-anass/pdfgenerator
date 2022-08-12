import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IProfile extends Document {
  name: string;
  image: string;
  userId: string | mongoose.Schema.Types.ObjectId;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", profileSchema);
export default Profile;
