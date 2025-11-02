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
  id: string | number;
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // اختیاری، برای آینده
  createdAt?: Date | string;
  updatedAt?: Date | string;
  avatar?: string;
}
