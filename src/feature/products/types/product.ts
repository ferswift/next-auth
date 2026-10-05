// Criação do produto
export interface Product {
  id: string;
  name: string;
  description: string | null;
  priceInCents: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  stock: number;
}

// Listagem dos produtos
export interface Products {
  products: Product[];
}
