import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../../components/global/Loading";
import PageHeader from "../../../components/global/PageHeader";
import { getOrderApi } from "../../../services/orders-service";

const OrderDetails = () => {

  const { orderId } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: [`order-details-${orderId}`],
    queryFn: () => getOrderApi(Number(orderId))
  });

  return (
    <>
      <PageHeader text={`Order Details - ID=${orderId}`} element="h2" showBack backRoute="/app/orders" />

      {
        isLoading ?
          <Loading /> :
          <div className="border border-emerald-900/40 mt-4 overflow-auto">
            <table className="w-full">
              <thead className="bg-neutral-800 sticky top-0">
                <tr>
                  <th className="px-2 py-4">Product</th>
                  <th className="px-2 py-4">Price</th>
                  <th className="px-2 py-4">Quantity</th>
                  <th className="px-2 py-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  order?.products.map((item) => (
                    <tr key={item.id} className="border border-neutral-800 even:bg-neutral-900 hover:bg-emerald-950/40">
                      <td className="p-2 text-lg flex items-center gap-2">
                        <img src={item.thumbnail} alt={item.title} className="w-10 h-10 rounded" />
                        {item.title}
                      </td>
                      <td className="p-2 text-lg">${item.price}</td>
                      <td className="p-2 text-lg">{item.quantity}</td>
                      <td className="p-2 text-lg">${item.total}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
      }
    </>
  );
};

export default OrderDetails;
