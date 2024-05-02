import { useState } from 'react';

import ProductList from '../components/ProductList';
import { sahteVeri } from '../sahteVeri.js';

export default function Products(props) {
  const [products, setProducts] = useState(sahteVeri);

  return (
    <div className="products-container">
      <ProductList products={products} />
    </div>
  );
}
