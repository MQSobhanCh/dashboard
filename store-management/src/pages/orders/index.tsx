import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import DsButton from "../../components/design-system/DsButton";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { getOrdersApi } from "../../services/orders-service";
import { getUserApi } from "../../services/users-service";
import { getOrderDate, getOrderStatus, statusColor } from "../../utils/order";

const Orders = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['orders-list'],
    queryFn: () => getOrdersApi()
  });

  const uniqueUserIds = [...new Set(data?.carts.map((order) => order.userId) ?? [])];

  const userQueries = useQueries({
    queries: uniqueUserIds.map((userId) => ({
      queryKey: [`customer-${userId}`],
      queryFn: () => getUserApi(userId),
      enabled: !!data
    }))
  });

  const getCustomerName = (userId: number) => {
    const index = uniqueUserIds.indexOf(userId);
    const userQuery = userQueries[index];
    if (!userQuery?.data) return `User #${userId}`;
    return `${userQuery.data.firstName} ${userQuery.data.lastName}`;
  };

  const getCustomerImage = (userId: number) => {
    const index = uniqueUserIds.indexOf(userId);
    return userQueries[index]?.data?.image;
  };

  return (
    <>
      <PageHeader text="Orders Page" />

      {
        isLoading ?
          <Loading /> :
          <div className="border border-emerald-900/40 rounded-xl overflow-auto mt-4">
            <table className="w-full">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-3 py-4 text-left">Order</th>
                  <th className="px-3 py-4 text-left">Customer</th>
                  <th className="px-3 py-4 text-left">Date</th>
                  <th className="px-3 py-4 text-left">Items</th>
                  <th className="px-3 py-4 text-left">Total</th>
                  <th className="px-3 py-4 text-left">Status</th>
                  <th className="px-3 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.carts.map((order) => {
                    const status = getOrderStatus(order.id);
                    return (
                      <tr key={order.id} className="border-t border-neutral-800 even:bg-neutral-900 hover:bg-emerald-950/40">
                        <td className="p-3 text-lg font-semibold">#{order.id}</td>
                        <td className="p-3 text-lg">
                          <div className="flex items-center gap-2">
                            <img
                              src={getCustomerImage(order.userId) || `https://api.dicebear.com/7.x/initials/svg?seed=${order.userId}`}
                              alt="customer"
                              className="w-8 h-8 rounded-full border border-emerald-900/40"
                            />
                            {getCustomerName(order.userId)}
                          </div>
                        </td>
                        <td className="p-3 text-neutral-400">{getOrderDate(order.id)}</td>
                        <td className="p-3">{order.totalQuantity} items ({order.totalProducts} products)</td>
                        <td className="p-3 font-semibold">${order.total.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[status]}`}>
                            {status}
                          </span>
                        </td>
                        <td className="p-3">
                          <Link to={`/app/orders/${order.id}`}>
                            <DsButton size="medium" color="primary">Details</DsButton>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
      }
    </>
  );
};

export default Orders;
