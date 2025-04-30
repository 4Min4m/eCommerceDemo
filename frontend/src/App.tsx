import { useState } from 'react';
import axios from 'axios';
function App() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [orders, setOrders] = useState<{ id: string; status: string }[]>([]);
  const createOrder = async () => {
    try {
      const response = await axios.post('http://<replace-with-ingress>/orders', {
        userId,
        amount: parseFloat(amount),
      });
      setOrders([...orders, response.data]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>E-Commerce Demo</h1>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={createOrder}>Create Order</button>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order {order.id}: {order.status}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;