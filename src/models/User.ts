// src/models/User.ts
import mongoose, { Schema, Model } from "mongoose";
import { User } from "@/types"; // اینجا همون اینترفیس فرانت رو میاریم

const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String },
  },
  { timestamps: true } // خودش createdAt و updatedAt میسازه
);


const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default UserModel;
