import { LucideMinus, LucidePlus, LucideShoppingCart, LucideTrash2 } from "lucide-react";
import { Link } from "react-router";
import DsButton from "../../components/design-system/DsButton";
import PageHeader from "../../components/global/PageHeader";
import { useCartStore } from "../../stores/cart.store";

const Cart = () => {

  const items = useCartStore((state) => state.items);
  const onIncreaseQuantity = useCartStore((state) => state.onIncreaseQuantity);
  const onDecreaseQuantity = useCartStore((state) => state.onDecreaseQuantity);
  const onRemoveFromCart = useCartStore((state) => state.onRemoveFromCart);
  const onClearCart = useCartStore((state) => state.onClearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalCount = useCartStore((state) => state.getTotalCount());

  const onConfirmRemove = (id: number, title: string) => {
    if (!confirm(`Remove "${title}" from your cart?`)) {
      return;
    }
    onRemoveFromCart(id);
  };

  const onConfirmClearCart = () => {
    if (!confirm('Remove all items from your cart?')) {
      return;
    }
    onClearCart();
  };

  if (items.length === 0) {
    return (
      <>
        <PageHeader text="Cart" />

        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <LucideShoppingCart size={48} className="text-neutral-400 dark:text-neutral-700" />
          <p className="text-neutral-500">Your cart is empty.</p>
          <Link to="/app/store">
            <DsButton color="primary">Go to Store</DsButton>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <PageHeader text={`Cart (${totalCount})`} />

        <DsButton color="error" startIcon={<LucideTrash2 size={16} />} onClick={onConfirmClearCart}>
          Clear Cart
        </DsButton>
      </div>

      <div className="flex flex-col gap-3">
        {
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-emerald-900/40 rounded-xl p-3"
            >
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />

              <div className="flex-1 min-w-0">
                <p className="text-neutral-900 dark:text-neutral-100 font-semibold truncate">{item.title}</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                {
                  item.quantity === 1 ? (
                    <DsButton
                      size="small"
                      color="error"
                      onClick={() => onConfirmRemove(item.id, item.title)}
                    >
                      <LucideTrash2 size={16} />
                    </DsButton>
                  ) : (
                    <DsButton
                      size="small"
                      color="secondary"
                      onClick={() => onDecreaseQuantity(item.id)}
                    >
                      <LucideMinus size={16} />
                    </DsButton>
                  )
                }

                <span className="w-6 text-center text-neutral-900 dark:text-neutral-100 font-semibold">
                  {item.quantity}
                </span>

                <DsButton
                  size="small"
                  color="secondary"
                  onClick={() => onIncreaseQuantity(item.id)}
                >
                  <LucidePlus size={16} />
                </DsButton>
              </div>

              <p className="w-20 text-right font-bold text-neutral-900 dark:text-neutral-100">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        }
      </div>

      <div className="flex justify-end items-center gap-4 mt-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-emerald-900/40 rounded-xl p-4">
        <span className="text-neutral-500">Total ({totalCount} items)</span>
        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${totalPrice.toFixed(2)}</span>
      </div>
    </>
  );
};

export default Cart;
