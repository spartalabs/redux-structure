import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import CatalogItem from '../components/CatalogItem';
import { Product } from '../domain/catalog';
import getProductsUseCase from '../useCases/GetProductsUseCase';

function Catalog() {
  const [catalog, setCatalog] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      const products = await getProductsUseCase();

      setCatalog(products);
    }

    loadData();
  }, []);

  return (
    <main>
      <h1>Catalog</h1>

      {catalog.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}

      <Cart />
    </main>
  );
}

export default Catalog;
