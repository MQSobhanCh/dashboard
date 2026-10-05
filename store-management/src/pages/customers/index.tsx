import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { getUsersApi } from "../../services/users-service";

const Customers = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['customers-list'],
    queryFn: () => getUsersApi()
  });

  return (
    <>
      <PageHeader text="Customers Page" />

      {
        isLoading ?
          <Loading /> :
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {
              data?.users.map((customer) => (
                <div key={customer.id} className="bg-neutral-900 border border-emerald-900/40 rounded-xl p-4 flex items-center gap-3">
                  <img src={customer.image} alt={customer.firstName} className="w-12 h-12 rounded-full border border-emerald-900/40" />
                  <div className="min-w-0">
                    <p className="text-neutral-100 font-semibold truncate">{customer.firstName} {customer.lastName}</p>
                    <p className="text-neutral-500 text-sm truncate">{customer.email}</p>
                  </div>
                </div>
              ))
            }
          </div>
      }
    </>
  );
};

export default Customers;
