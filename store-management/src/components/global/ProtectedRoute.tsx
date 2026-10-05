import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import toast from "react-hot-toast";
import { getMeApi } from "../../services/users-service";
import { useAuthStore } from "../../stores/auth.store";
import MainLoading from "./MainLoading";

type Status = 'checking' | 'authorized' | 'unauthorized';

const ProtectedRoute = () => {

  const [status, setStatus] = useState<Status>('checking');
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setStatus('unauthorized');
      return;
    }

    getMeApi()
      .then((user) => {
        setUser(user);
        setStatus('authorized');
      })
      .catch((error) => {
        toast.error((error as Error).message);
        sessionStorage.removeItem('token');
        setStatus('unauthorized');
      });
  }, []);

  if (status === 'checking') {
    return <MainLoading />;
  }

  if (status === 'unauthorized') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
