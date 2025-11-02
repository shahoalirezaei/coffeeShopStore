import mongoose, { Model, Schema } from "mongoose";
import { ProductCategoryBoxProps as ICategory } from "@/types";

const CategorySchema = new Schema<ICategory>(
    {
        _id: { type: String, required: true },
        imageSrc: { type: String, required: true },
        title: { type: String, required: true },
        href: { type: String },
    },
    { timestamps: true },
);

const CategoryModel: Model<ICategory> = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default CategoryModel;