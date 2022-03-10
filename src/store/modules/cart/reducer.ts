import produce from 'immer';
import { Reducer } from 'redux';
import { CartItem } from '../../../domain/catalog';
import { ActionTypes } from './types';

export interface CartState {
  items: CartItem[];
  failedStockCheck: number[];
}

const INITIAL_STATE: CartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<CartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess:
        const { product } = action.payload;

        const productInCartIndex = state.items.findIndex((item) => item.product.id === product.id);

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }
        break;

      case ActionTypes.addProductToCartFailure:
        draft.failedStockCheck.push(action.payload.productId);
        break;
      default:
        return draft;
    }
  });
};

export default cart;
