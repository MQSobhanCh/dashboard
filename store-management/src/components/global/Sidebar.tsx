import {
  LucideLayoutDashboard,
  LucideList,
  LucideShoppingBag,
  LucideShoppingCart,
  LucideStore,
  LucideTags,
  LucideUsers
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

type NavItem = {
  title: string;
  to: string;
  icon: ReactNode;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', to: '/app/dashboard', icon: <LucideLayoutDashboard size={19} /> },
    ]
  },
  {
    label: 'Catalog',
    items: [
      { title: 'Products', to: '/app/products', icon: <LucideList size={19} /> },
      { title: 'Categories', to: '/app/categories', icon: <LucideTags size={19} /> },
    ]
  },
  {
    label: 'Sales',
    items: [
      { title: 'Orders', to: '/app/orders', icon: <LucideShoppingCart size={19} /> },
      { title: 'Customers', to: '/app/customers', icon: <LucideUsers size={19} /> },
    ]
  },
  {
    label: 'Shop',
    items: [
      { title: 'Store', to: '/app/store', icon: <LucideShoppingBag size={19} /> },
      { title: 'Cart', to: '/app/cart', icon: <LucideShoppingCart size={19} /> },
    ]
  }
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-emerald-900/40 fixed top-0 bottom-0 left-0 flex flex-col z-20">

      <div className="h-16 flex items-center gap-2 px-5 border-b border-neutral-200 dark:border-emerald-900/40 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <LucideStore className="text-emerald-600 dark:text-emerald-400" size={20} />
        </div>
        <div className="leading-tight">
          <p className="text-neutral-900 dark:text-white font-bold text-sm">Store Manager</p>
          <p className="text-neutral-500 text-[11px]">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-auto px-3 py-4">
        {
          navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="text-neutral-400 dark:text-neutral-600 text-[11px] font-bold uppercase tracking-wider px-3 mb-2">
                {group.label}
              </p>
              <ul className="flex flex-col gap-1">
                {
                  group.items.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors ${isActive ? 'bg-emerald-500/10! text-emerald-600! dark:text-emerald-400! font-semibold' : ''}`
                        }
                      >
                        {item.icon}
                        {item.title}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-emerald-900/40 shrink-0">
        <p className="text-neutral-400 dark:text-neutral-600 text-[11px]">Store Manager v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
