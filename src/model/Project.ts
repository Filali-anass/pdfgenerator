import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IProject extends Document {
  name: string;
  image: string;
  description: string;
  userId: string | mongoose.Schema.Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
export default Project;
