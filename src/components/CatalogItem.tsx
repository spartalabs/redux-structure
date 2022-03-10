import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../domain/catalog';
import { StoreState } from '../store';
import { addProductToCartRequest } from '../store/modules/cart/actions';

interface CatalogItemProps {
  product: Product;
}

function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<StoreState, boolean>((state) =>
    state.cart.failedStockCheck.includes(product.id),
  );

  const handleAddToCart = () => {
    dispatch(addProductToCartRequest(product));
  };

  return (
    <article key={product.id}>
      <strong>{`${product.title} - `}</strong>

      <span>{`${product.price}  `}</span>

      <button type="button" onClick={handleAddToCart}>
        Comprar
      </button>

      {hasFailedStockCheck && <span style={{ color: 'red' }}>{' Falta de estoque'}</span>}
    </article>
  );
}

export default CatalogItem;
