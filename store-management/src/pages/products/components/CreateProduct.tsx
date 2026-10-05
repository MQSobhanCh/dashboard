import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import PageHeader from "../../../components/global/PageHeader";
import { createProductApi } from "../../../services/products-service";
import type { ProductForm as ProductFormData, ProductsResponse } from "../../../types/product";
import ProductForm from "./ProductForm";

const CreateProduct = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProductApi,
    onSuccess: (newProduct) => {
      toast.success('Product has been created successfully.');
      
      queryClient.setQueriesData<ProductsResponse>(
        { queryKey: ['products-list'] },
        (old) => old
          ? {
              ...old,
              products: [newProduct, ...old.products],
              total: old.total + 1
            }
          : old
      );

      navigate('/app/products');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onCreate = (formData: ProductFormData) => {
    mutate(formData);
  };

  return (
    <>
      <PageHeader text="Create Product" showBack backRoute="/app/products" />
      <ProductForm isPending={isPending} onSubmit={onCreate} />
    </>
  );
};

export default CreateProduct;
