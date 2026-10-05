import { useQuery } from "@tanstack/react-query";
import { LucideShoppingCart } from "lucide-react";
import { useState } from "react";
import DsButton from "../../components/design-system/DsButton";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { getCategoriesApi, getProductsApi } from "../../services/products-service";
import { useCartStore } from "../../stores/cart.store";

const Store = () => {

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const onAddToCart = useCartStore((state) => state.onAddToCart);

  const { data, isLoading } = useQuery({
    queryKey: ['store-products', search, category],
    queryFn: () => getProductsApi({ search: search || undefined, category: category || undefined, limit: 20 })
  });

  const { data: categories } = useQuery({
    queryKey: ['categories-list'],
    queryFn: () => getCategoriesApi()
  });

  return (
    <>
      <PageHeader text="Store" />

      <div className="flex flex-wrap items-center gap-3 mb-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-emerald-900/40 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-lg flex-1 min-w-[180px]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories?.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      {
        isLoading ?
          <Loading /> :
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              data?.products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-emerald-900/40 rounded-xl overflow-hidden flex flex-col">
                  <img src={product.thumbnail} alt={product.title} className="w-full h-36 object-cover" />
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-neutral-900 dark:text-neutral-100 font-semibold truncate">{product.title}</p>
                    <p className="text-neutral-500 text-sm capitalize mb-2">{product.category}</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-auto mb-3">${product.price}</p>

                    <DsButton
                      color="primary"
                      fullWidth
                      startIcon={<LucideShoppingCart size={16} />}
                      onClick={() => onAddToCart(product)}
                    >
                      Add to Cart
                    </DsButton>
                  </div>
                </div>
              ))
            }
          </div>
      }
    </>
  );
};

export default Store;
