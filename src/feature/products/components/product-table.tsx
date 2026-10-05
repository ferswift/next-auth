import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "../types/product";
import { formattedPriceToBRL } from "../utils/formatted-price";

// Traz apenas as propriedades necessárias para a tabela, evitando expor dados sensíveis
interface ProductTableProps {
  products: Pick<Product, "id" | "name" | "priceInCents" | "stock">[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Product Price</TableHead>
          <TableHead>Product Stock</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formattedPriceToBRL(product.priceInCents)}</TableCell>
            <TableCell>{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
