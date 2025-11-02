// src/app/page.tsx
import { BlogsSection, Categories, CoffeeClub, ContactUsSection, HomeLanding, MostSelling, ProductsCategory, Services } from "@/components";
import NewProducts from "@/components/home/NewProducts";
import React from "react";



export default function Page() {
  return (
    <>
      <HomeLanding />
      <NewProducts />
      <Categories />
      <ProductsCategory />
      <MostSelling />
      <CoffeeClub />
      <BlogsSection />
      <ContactUsSection />
      <Services />
    </>
  );
}

