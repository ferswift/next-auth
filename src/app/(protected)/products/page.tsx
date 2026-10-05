import { auth } from "@/feature/lib/auth";
import { ProductTable } from "@/feature/products/components/product-table";
import { MOCK_PRODUCTS } from "@/feature/products/mock/products";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProductsPage = async () => {
  // Descobre está autenticado, caso não esteja redireciona para a página de login
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Pega os produtods do usuário logado
  // const products = await getProducts(session.user.id);

  return (
    <div>
      <ProductTable products={MOCK_PRODUCTS} />
    </div>
  );
};

export default ProductsPage;
