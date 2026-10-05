export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

const STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export const getOrderStatus = (id: number): OrderStatus => {
  return STATUSES[id % STATUSES.length];
};

export const getOrderDate = (id: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - (id * 3) % 60);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const statusColor: Record<OrderStatus, string> = {
  Pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
  Processing: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
  Shipped: 'bg-violet-500/10 text-violet-400 border border-violet-500/30',
  Delivered: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
};
