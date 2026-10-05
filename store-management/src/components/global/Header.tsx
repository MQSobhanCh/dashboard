import { LucideLogOut, LucideMoon, LucideShoppingCart, LucideSun } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import { useCartStore } from "../../stores/cart.store";
import { useGlobalStore } from "../../stores/global.store";

const Header = () => {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useGlobalStore();
  const { user } = useAuthStore();
  const totalCartCount = useCartStore((state) => state.getTotalCount());

  const logout = () => {
    if (!confirm('Are you sure to want to logout?')) {
      return
    }
    sessionStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header className="h-16 bg-white dark:bg-neutral-950/80 backdrop-blur border-b border-neutral-200 dark:border-emerald-900/40 fixed top-0 right-0 left-64 z-10">
      <nav className="flex justify-end items-center h-full px-6">
        <div className="flex gap-4 items-center text-neutral-900 dark:text-white">
          <span onClick={toggleTheme} className="cursor-pointer text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300">
            {theme === 'light' ? <LucideMoon /> : <LucideSun />}
          </span>

          <Link to="/app/cart" className="relative text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300">
            <LucideShoppingCart />
            {totalCartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                {totalCartCount}
              </span>
            )}
          </Link>

          <Link to="/app/profile" className="flex items-center gap-2 text-lg text-neutral-800 dark:text-neutral-100">
            <img src={user?.image} alt={user?.firstName + ' ' + user?.lastName} className="w-9 h-9 p-1 bg-neutral-200 dark:bg-neutral-800 rounded-full border border-neutral-300 dark:border-emerald-900/40" />
            {user?.firstName + ' ' + user?.lastName}
          </Link>
          <LucideLogOut className="text-rose-500 cursor-pointer" size={18} onClick={logout} />
        </div>
      </nav>
    </header>
  )
}

export default Header
