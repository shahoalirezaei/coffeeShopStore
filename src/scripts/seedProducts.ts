// // src/scripts/seedProducts.ts
// import mongoose from "mongoose";
// import ProductModel from "../models/Product"
// import { products } from "../data/products";
// import { dbConnect } from "../lib/mongodb";

// async function seed() {
//   try {
//     await dbConnect();
//     console.log("✅ Connected to MongoDB");

//     // حذف محصولات قبلی (اختیاری)
//     await ProductModel.deleteMany({});
//     console.log("🗑️ Cleared existing products");

//     // افزودن محصولات جدید
//     await ProductModel.insertMany(products);
//     console.log(`🌱 Seeded ${products.length} products`);

//     process.exit(0); // خروج از Node بعد از موفقیت
//   } catch (err) {
//     console.error("❌ Error seeding products:", err);
//     process.exit(1);
//   }
// }

// seed();
