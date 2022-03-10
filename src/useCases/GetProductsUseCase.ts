import { Product } from '../domain/catalog';
import api from '../services/api';

async function getProductsUseCase(): Promise<Product[]> {
  const { data: products } = await api.get<Product[]>('/products');

  return products;
}

export default getProductsUseCase;
