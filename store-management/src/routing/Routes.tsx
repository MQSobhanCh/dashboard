import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../components/global/AppLayout";
import MainLoading from "../components/global/MainLoading";
import ProtectedRoute from "../components/global/ProtectedRoute";

const Login = lazy(() => import('../pages/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Products = lazy(() => import('../pages/products'));
const CreateProduct = lazy(() => import('../pages/products/components/CreateProduct'));
const EditProduct = lazy(() => import('../pages/products/components/EditProduct'));
const ProductDetails = lazy(() => import('../pages/products/components/Details'));
const Categories = lazy(() => import('../pages/categories'));
const Orders = lazy(() => import('../pages/orders'));
const OrderDetails = lazy(() => import('../pages/orders/components/Details'));
const Customers = lazy(() => import('../pages/customers'));
const Store = lazy(() => import('../pages/store'));
const Cart = lazy(() => import('../pages/cart'));
const Profile = lazy(() => import('../pages/profile'));
const NotFound = lazy(() => import('../pages/not-found'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<MainLoading />}>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to='/app/dashboard' />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to='dashboard' />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:productId/edit" element={<EditProduct />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="customers" element={<Customers />} />
            <Route path="store" element={<Store />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
