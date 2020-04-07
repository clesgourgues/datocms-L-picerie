import React from 'react';
import { getTotalItems } from '../helpers/cart';

const Cart = ({ cart }) => (
  <div className='Snipcart link snipcart-checkout'>
    <div className='Snipcart-cart'></div>
    {cart && cart.items.length && (
      <span className='Snipcart-items'>{getTotalItems(cart.items)}</span>
    )}
    {cart && cart.total > 0 && <span className='Snipcart-total'>{cart.total} €</span>}
  </div>
);

export default Cart;
