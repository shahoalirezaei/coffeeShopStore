import mongoose, { Model, Schema } from "mongoose";
import { BlogBoxProps as IBlog } from "@/types";

const BlogSchema = new Schema<IBlog>({
  _id: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  link: { type: String },
}, { timestamps: true });


const BlogModel: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default BlogModel;