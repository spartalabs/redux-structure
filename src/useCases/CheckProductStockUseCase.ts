import { ProductStock } from '../domain/catalog';
import api from '../services/api';

async function checkProductStockUseCase(productId: number): Promise<ProductStock> {
  const { data: stock } = await api.get<ProductStock>(`/stock/${productId}`);

  return stock;
}

export default checkProductStockUseCase;