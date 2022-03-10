import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { StoreState } from '../..';
import { ProductStock } from '../../../domain/catalog';
import checkProductStockUseCase from '../../../useCases/CheckProductStockUseCase';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import { ActionTypes } from './types';

type CheckProductStockRequet = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock(action: CheckProductStockRequet) {
  const { product } = action.payload;

  try {
    const currentQuantity: number = yield select((state: StoreState) => {
      return state.cart.items.find((item) => item.product.id === product.id)?.quantity ?? 0;
    });

    const availableStock: ProductStock = yield call(checkProductStockUseCase, product.id);

    if (availableStock.quantity > currentQuantity) {
      yield put(addProductToCartSuccess(product));
    } else {
      yield put(addProductToCartFailure(product.id));
    }
  } catch {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)]);
