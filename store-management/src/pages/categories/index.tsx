import { useQueries, useQuery } from "@tanstack/react-query";
import { LucideTag } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { getCategoriesApi, getCategoryProductCountApi } from "../../services/products-service";

const Categories = () => {

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories-list'],
    queryFn: () => getCategoriesApi()
  });

  const countQueries = useQueries({
    queries: (categories ?? []).map((category) => ({
      queryKey: [`category-count-${category.slug}`],
      queryFn: () => getCategoryProductCountApi(category.slug),
      enabled: !!categories
    }))
  });

  return (
    <>
      <PageHeader text="Categories Page" />

      {
        isLoading ?
          <Loading /> :
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {
              categories?.map((category, index) => (
                <Link
                  key={category.slug}
                  to={`/app/products?category=${category.slug}`}
                  className="bg-neutral-900 border border-emerald-900/40 rounded-xl p-5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
                    <LucideTag className="text-emerald-400" size={20} />
                  </div>
                  <p className="text-neutral-100 font-semibold capitalize mb-1">{category.name}</p>
                  <p className="text-neutral-500 text-sm">
                    {countQueries[index]?.data ?? '...'} products
                  </p>
                </Link>
              ))
            }
          </div>
      }
    </>
  );
};

export default Categories;
