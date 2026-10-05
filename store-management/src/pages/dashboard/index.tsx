import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useQuery } from "@tanstack/react-query";
import { LucidePackage, LucideShoppingCart, LucideTags } from "lucide-react";
import PageHeader from "../../components/global/PageHeader";
import { getOrdersApi } from "../../services/orders-service";
import { getCategoriesApi, getProductsApi } from "../../services/products-service";

const Dashboard = () => {

  const { data: productsData } = useQuery({
    queryKey: ['products-count'],
    queryFn: () => getProductsApi()
  });

  const { data: categories } = useQuery({
    queryKey: ['categories-count'],
    queryFn: () => getCategoriesApi()
  });

  const { data: ordersData } = useQuery({
    queryKey: ['orders-count'],
    queryFn: () => getOrdersApi()
  });

  const stats = [
    { title: 'Products', value: productsData?.total ?? '-', icon: <LucidePackage size={28} /> },
    { title: 'Categories', value: categories?.length ?? '-', icon: <LucideTags size={28} /> },
    { title: 'Orders', value: ordersData?.total ?? '-', icon: <LucideShoppingCart size={28} /> },
  ];

  return (
    <>
      <PageHeader text="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {
          stats.map((item) => (
            <Card key={item.title}>
              <CardContent className="flex items-center gap-4">
                <div className="text-emerald-500">{item.icon}</div>
                <div>
                  <Typography variant="h5" className="font-bold">{item.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </>
  );
};

export default Dashboard;
