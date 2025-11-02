import mongoose, { Schema, Model } from "mongoose";
import { ProductBoxProps as IProduct } from "@/types";


const ProductSchema = new Schema<IProduct>(
      {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number },
    oldPrice: { type: Number },
    description: { type: String },
    image: { type: String, required: true },
    images: { type: [String] },
    rating: { type: Number },
    available: { type: Boolean, required: true },
    discount: { type: Number },
  },
  { timestamps: true }
)

const ProductModel : Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

export default ProductModel;