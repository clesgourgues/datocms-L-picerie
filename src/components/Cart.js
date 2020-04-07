import React from 'react';
import { getTotalItems } from '../helpers/cart';

const Cart = ({ cart }) => (
  <div className='Snipcart__cart link snipcart-checkout'>
    <div className=' Snipcart-cart'></div>
    <p>
      {cart && cart.items.length ? (
        <span>
          {getTotalItems(cart.items)} {getTotalItems(cart.items) > 1 ? 'articles' : 'article'}
        </span>
      ) : (
        <span>Votre panier est vide</span>
      )}
    </p>
    {cart && cart.total > 0 && <p>{cart.total} €</p>}
  </div>
);

export default Cart;
