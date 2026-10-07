import OrdersListView from '../../../components/portal/order/OrdersListView';

export default function OrdersListPage() {
  return <OrdersListView basePath="/admin/orders" title="My Orders" subtitle="Orders within your assigned scope." />;
}
