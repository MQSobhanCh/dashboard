import { useForm } from "react-hook-form";
import { Link } from "react-router";
import DsButton from "../../../components/design-system/DsButton";
import type { ProductForm as ProductFormData } from "../../../types/product";

type PropTypes = {
  defaultValues?: ProductFormData;
  isPending: boolean;
  onSubmit: (data: ProductFormData) => void;
};

const ProductForm = ({ defaultValues, isPending, onSubmit }: PropTypes) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      brand: ''
    }
  });

  return (
    <form className="bg-neutral-900 p-8 rounded-lg mx-auto w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label className='flex justify-between items-center text-lg mb-1'>
          Title
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </label>
        <input
          type="text"
          placeholder='Enter Product Title'
          className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
          {...register('title', { required: 'Product title is required' })}
        />
      </div>

      <div className='mb-4'>
        <label className='flex justify-between items-center text-lg mb-1'>
          Description
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </label>
        <textarea
          placeholder='Enter Product Description'
          className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
          rows={4}
          {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'At Least 10 Characters' } })}
        ></textarea>
      </div>

      <div className="flex gap-4">
        <div className='mb-4 flex-1'>
          <label className='flex justify-between items-center text-lg mb-1'>
            Category
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
          </label>
          <input
            type="text"
            placeholder='e.g. smartphones'
            className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
            {...register('category', { required: 'Category is required' })}
          />
        </div>

        <div className='mb-4 flex-1'>
          <label className='flex justify-between items-center text-lg mb-1'>Brand</label>
          <input
            type="text"
            placeholder='Enter Brand'
            className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
            {...register('brand')}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className='mb-4 flex-1'>
          <label className='flex justify-between items-center text-lg mb-1'>
            Price
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </label>
          <input
            type="number"
            step="0.01"
            placeholder='Enter Price'
            className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
            {...register('price', { required: 'Price is required', valueAsNumber: true, min: { value: 0, message: 'Price must be positive' } })}
          />
        </div>

        <div className='mb-4 flex-1'>
          <label className='flex justify-between items-center text-lg mb-1'>
            Stock
            {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
          </label>
          <input
            type="number"
            placeholder='Enter Stock'
            className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
            {...register('stock', { required: 'Stock is required', valueAsNumber: true, min: { value: 0, message: 'Stock must be positive' } })}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <DsButton type="submit" color="primary" size="large" loading={isPending}>Save</DsButton>
        <Link to="/app/products">
          <DsButton color="inherit" size="large" disabled={isPending}>Cancel</DsButton>
        </Link>
      </div>
    </form>
  );
};

export default ProductForm;
