import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IReport extends Document {
  userId: string | mongoose.Schema.Types.ObjectId;
  projectId: string | mongoose.Schema.Types.ObjectId;
  date: string;
  city: string;
  subject: string;
  sections: {
    _id?: string;
    title: string;
    sentences: string[];
  }[];
  pictures: string[];
}

const reportSchema = new Schema<IReport>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sections: [
      {
        title: {
          type: String,
          required: true,
        },
        sentences: [
          {
            type: String,
          },
        ],
      },
    ],
    pictures: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Report =
  mongoose.models.Report || mongoose.model<IReport>("Report", reportSchema);
export default Report;
