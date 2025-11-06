export interface ProductBoxProps {
  _id: string;
  title: string;
  price: number | null;
  oldPrice?: number | null;
  description?: string;
  image: string;
  images?: string[];
  rating?: number;
  available: boolean;
  discount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogBoxProps {
  _id: string | number;
  slug: string;
  image: string;
  title: string;
  date: string;
  author?: string;
  description?: string;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ProductCategoryBoxProps {
  _id: string;
  imageSrc: string;
  title: string;
  href?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: string | number;
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // اختیاری، برای آینده
  createdAt?: Date | string;
  updatedAt?: Date | string;
  avatar?: string;
}

export interface Order {
  _id: string;
  status: "pending" | "delivered" | "returned" | "canceled";
  date: string; // ISO date string
  totalAmount: number;
  items: {
    productId: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

export interface Address {
  id: string;
  title?: string;
  city: string;
  postalCode: string;
  receiver: string;
  phone: string;
  isDefault?: boolean;
}
