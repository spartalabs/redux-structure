import React from 'react';
import { useSelector } from 'react-redux';
import { CartItem } from '../domain/catalog';
import { StoreState } from '../store';

function Cart() {
  const items = useSelector<StoreState, CartItem[]>((state) => state.cart.items);

  return (
    <table>
      <thead>
        <th>Produto</th>
        <th>Preço</th>
        <th>Quantidae</th>
        <th>Subtotal</th>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.product.id}>
            <td>{item.product.title}</td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Cart;
