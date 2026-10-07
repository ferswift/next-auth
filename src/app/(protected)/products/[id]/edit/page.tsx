import { auth } from "@/feature/lib/auth";
import { getProductById } from "@/feature/products/queries/get-product-by-id";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const result = await getProductById(id, session.user.id);

  return <div>{result.product?.name}</div>;
};

export default EditPage;
