import { ProductCategoryBoxProps } from "@/types";

export const categories: ProductCategoryBoxProps[] = [
 {
  _id: crypto.randomUUID(),
      imageSrc: "/images/categories/category1.png",
      title: "قهوه دمی و اسپرسو",
    },
    {
      _id: crypto.randomUUID(),
      imageSrc: "/images/categories/category2.png",
      title: "لوازم جانبی و تجهیزات",
    },
    {
      _id: crypto.randomUUID(),
      imageSrc: "/images/categories/category3.png",
      title: "اسپرسو ساز",
    },
    {
      _id: crypto.randomUUID(),
      imageSrc: "/images/categories/category4.png",
      title: "پک تستر قهوه",
    },
    {
      _id: crypto.randomUUID(),
      imageSrc: "/images/categories/category5.png",
      title: "قهوه ترک",
    },
];
