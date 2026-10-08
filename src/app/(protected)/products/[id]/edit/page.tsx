import { auth } from "@/feature/lib/auth";
import { ProductForm } from "@/feature/products/components/product-form";
import { getProductById } from "@/feature/products/queries/get-product-by-id";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const result = await getProductById(id, session.user.id);

  if (!result.success || !result.product) {
    notFound();
  }

  return (
    <div>
      <ProductForm product={result.product} />
    </div>
  );
};

export default EditPage;
