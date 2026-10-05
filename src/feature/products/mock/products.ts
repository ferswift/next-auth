import { Product } from "../types/product";

export const MOCK_PRODUCTS: Pick<
  Product,
  "id" | "name" | "priceInCents" | "stock"
>[] = [
  {
    id: "1",
    name: "Product 1",
    priceInCents: 1000,
    stock: 10,
  },
  {
    id: "2",
    name: "Product 2",
    priceInCents: 2000,
    stock: 20,
  },
  {
    id: "3",
    name: "Product 3",
    priceInCents: 3000,
    stock: 30,
  },
  {
    id: "4",
    name: "Product 4",
    priceInCents: 4000,
    stock: 40,
  },
  {
    id: "5",
    name: "Product 5",
    priceInCents: 5000,
    stock: 50,
  },
  {
    id: "6",
    name: "Product 6",
    priceInCents: 6000,
    stock: 60,
  },
  {
    id: "7",
    name: "Product 7",
    priceInCents: 7000,
    stock: 70,
  },
  {
    id: "8",
    name: "Product 8",
    priceInCents: 8000,
    stock: 80,
  },
  {
    id: "9",
    name: "Product 9",
    priceInCents: 9000,
    stock: 90,
  },
];
