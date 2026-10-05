import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../components/global/Loading";
import PageHeader from "../../../components/global/PageHeader";
import { getProductApi, updateProductApi } from "../../../services/products-service";
import type { ProductForm as ProductFormData, ProductsResponse } from "../../../types/product";
import ProductForm from "./ProductForm";

const EditProduct = () => {

  const { productId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: [`product-details-${productId}`],
    queryFn: () => getProductApi(Number(productId))
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: ProductFormData) => updateProductApi(Number(productId), formData),
    onSuccess: (updatedProduct) => {
      toast.success('Product has been updated successfully.');
      queryClient.setQueriesData<ProductsResponse>(
        { queryKey: ['products-list'] },
        (old) => old
          ? {
              ...old,
              products: old.products.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item
              )
            }
          : old
      );

      queryClient.setQueryData([`product-details-${productId}`], updatedProduct);

      navigate('/app/products');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <>
      <PageHeader text={`Edit Product - ID=${productId}`} showBack backRoute="/app/products" />

      {
        isLoading || !product ?
          <Loading /> :
          <ProductForm
            defaultValues={{
              title: product.title,
              description: product.description,
              category: product.category,
              price: product.price,
              stock: product.stock,
              brand: product.brand
            }}
            isPending={isPending}
            onSubmit={mutate}
          />
      }
    </>
  );
};

export default EditProduct;
