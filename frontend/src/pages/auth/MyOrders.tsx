import { useEffect, useState } from "react";
import type { Order } from "../../models/Order";

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async() => {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/my-orders", {
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
      });
      const json = await res.json();
      setOrders(json);
    }
    getOrders();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Created</th>
            <th>Total sum</th>
            <th>Parcel Machine</th>
            <th>Payment State</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => 
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.created.toString()}</td>
              <td>{order.total}</td>
              <td>{order.parcelMachine}</td>
              <td>{order.paymentState}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MyOrders