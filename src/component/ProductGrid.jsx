import React from 'react';
import Product from './Product';

function ProductGrid({ products}) {
  return (
    <div>
    
      <div className="product-grid ml-7 mr-7 ">
        {products?.map((product) => (
          <Product key={product.id} product={product}  />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;




