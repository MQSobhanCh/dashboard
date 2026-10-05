import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import DsTypography from "../../../components/design-system/DsTypography";
import Loading from "../../../components/global/Loading";
import PageHeader from "../../../components/global/PageHeader";
import { getProductApi } from "../../../services/products-service";

const ProductDetails = () => {

  const { productId } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: [`product-details-${productId}`],
    queryFn: () => getProductApi(Number(productId))
  });

  return (
    <>
      <PageHeader text={`Product Details - ID=${productId}`} element="h2" showBack backRoute="/app/products" />

      {
        isLoading ?
          <Loading /> :
          <div className="bg-neutral-800 p-4 rounded-lg w-1/2 flex gap-4">
            <img src={product?.thumbnail} alt={product?.title} className="w-40 h-40 object-cover rounded-lg" />
            <div>
              <DsTypography element="h1" className="text-2xl font-bold mb-2">{product?.title || '-'}</DsTypography>
              <DsTypography element="p" className="text-lg mb-2">{product?.description || '-'}</DsTypography>
              <DsTypography element="p" className="text-lg">{`Category: ${product?.category}`}</DsTypography>
              <DsTypography element="p" className="text-lg">{`Price: $${product?.price}`}</DsTypography>
              <DsTypography element="p" className="text-lg">{`Stock: ${product?.stock}`}</DsTypography>
            </div>
          </div>
      }
    </>
  );
};

export default ProductDetails;
