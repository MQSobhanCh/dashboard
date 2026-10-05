import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideLayoutGrid,
  LucidePencil,
  LucideTable,
  LucideTrash2
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router";
import DsButton from "../../components/design-system/DsButton";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { deleteProductApi, getCategoriesApi, getProductsApi } from "../../services/products-service";
import type { ProductsQuery } from "../../services/products-service";
import type { ProductsResponse } from "../../types/product";

const PAGE_SIZE = 8;

const Products = () => {

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') ?? '');
  const [sortBy, setSortBy] = useState<ProductsQuery['sortBy']>(undefined);
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const query: ProductsQuery = {
    search: search || undefined,
    category: category || undefined,
    sortBy,
    order: 'asc',
    skip: page * PAGE_SIZE,
    limit: PAGE_SIZE
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products-list', query],
    queryFn: () => getProductsApi(query)
  });

  const { data: categories } = useQuery({
    queryKey: ['categories-list'],
    queryFn: () => getCategoriesApi()
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: (_data, deletedId) => {

      queryClient.setQueriesData<ProductsResponse>(
        { queryKey: ['products-list'] },
        (old) => old
          ? {
              ...old,
              products: old.products.filter((product) => product.id !== deletedId),
              total: old.total - 1
            }
          : old
      );

      toast.success('Product deleted');
    },
    onError: (error) => {
      toast.error((error as Error).message);
    }
  });

  const onDelete = (id: number) => {
    if (!confirm('Are you sure to want to delete this product?')) {
      return;
    }
    deleteProduct(id);
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1;

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <PageHeader text="Products Page" />

        <Link to="create">
          <DsButton color="primary" size="large">Create Product</DsButton>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 bg-neutral-900 border border-emerald-900/40 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="border border-neutral-700 bg-neutral-950 px-3 py-2 rounded-lg text-neutral-100 flex-1 min-w-[180px]"
        />

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(0); }}
          className="border border-neutral-700 bg-neutral-950 px-3 py-2 rounded-lg text-neutral-100"
        >
          <option value="">All Categories</option>
          {categories?.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>

        <select
          value={sortBy ?? ''}
          onChange={(e) => setSortBy((e.target.value || undefined) as ProductsQuery['sortBy'])}
          className="border border-neutral-700 bg-neutral-950 px-3 py-2 rounded-lg text-neutral-100"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
        </select>

        <div className="flex border border-neutral-700 rounded-lg overflow-hidden ml-auto">
          <button
            onClick={() => setView('table')}
            className={`p-2 ${view === 'table' ? 'bg-emerald-500/10 text-emerald-400' : 'text-neutral-500'}`}
          >
            <LucideTable size={18} />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-2 ${view === 'grid' ? 'bg-emerald-500/10 text-emerald-400' : 'text-neutral-500'}`}
          >
            <LucideLayoutGrid size={18} />
          </button>
        </div>
      </div>

      {
        isLoading ?
          <Loading /> :
          <>
            {
              view === 'table' ?
                <div className="border border-emerald-900/40 rounded-xl overflow-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-800">
                      <tr>
                        <th className="px-2 py-4"></th>
                        <th className="px-2 py-4 text-left">Title</th>
                        <th className="px-2 py-4 text-left">Category</th>
                        <th className="px-2 py-4 text-left">Price</th>
                        <th className="px-2 py-4 text-left">Stock</th>
                        <th className="px-2 py-4 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data?.products.map((product) => (
                          <tr key={product.id} className="border-t border-neutral-800 even:bg-neutral-900 hover:bg-emerald-950/40">
                            <td className="p-2"><img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover rounded-lg" /></td>
                            <td className="p-2 text-lg">{product.title}</td>
                            <td className="p-2 text-lg capitalize">{product.category}</td>
                            <td className="p-2 text-lg">${product.price}</td>
                            <td className="p-2 text-lg">{product.stock}</td>
                            <td className="p-2 text-lg">
                              <div className="flex gap-2">
                                <Link to={`/app/products/${product.id}`}>
                                  <DsButton size="medium" color="primary">Details</DsButton>
                                </Link>
                                <Link to={`/app/products/${product.id}/edit`}>
                                  <DsButton size="medium" color="secondary" startIcon={<LucidePencil size={16} />} />
                                </Link>
                                <DsButton size="medium" color="error" startIcon={<LucideTrash2 size={16} />} onClick={() => onDelete(product.id)} />
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {
                    data?.products.map((product) => (
                      <div key={product.id} className="bg-neutral-900 border border-emerald-900/40 rounded-xl overflow-hidden flex flex-col">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-36 object-cover" />
                        <div className="p-3 flex-1 flex flex-col">
                          <p className="text-neutral-100 font-semibold truncate">{product.title}</p>
                          <p className="text-neutral-500 text-sm capitalize mb-2">{product.category}</p>
                          <p className="text-emerald-400 font-bold mt-auto mb-3">${product.price}</p>
                          <div className="flex gap-2">
                            <Link to={`/app/products/${product.id}`} className="flex-1">
                              <DsButton size="small" color="primary" fullWidth>Details</DsButton>
                            </Link>
                            <Link to={`/app/products/${product.id}/edit`}>
                              <DsButton size="small" color="secondary" startIcon={<LucidePencil size={14} />} />
                            </Link>
                            <DsButton size="small" color="error" startIcon={<LucideTrash2 size={14} />} onClick={() => onDelete(product.id)} />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
            }

            <div className="flex justify-between items-center mt-4">
              <p className="text-neutral-500 text-sm">{data?.total ?? 0} products total</p>
              <div className="flex items-center gap-2">
                <DsButton size="small" color="secondary" disabled={page === 0} startIcon={<LucideChevronLeft size={16} />} onClick={() => setPage((p) => p - 1)} />
                <span className="text-neutral-400 text-sm">Page {page + 1} / {totalPages || 1}</span>
                <DsButton size="small" color="secondary" disabled={page + 1 >= totalPages} startIcon={<LucideChevronRight size={16} />} onClick={() => setPage((p) => p + 1)} />
              </div>
            </div>
          </>
      }
    </>
  );
};

export default Products;
