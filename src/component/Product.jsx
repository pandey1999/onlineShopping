import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

function Product({ product }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    window.location.reload();
  };

  return (
    <div className="product bg-white p-5 rounded-2xl shadow-md transition-transform transform hover:scale-105 flex flex-col ">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      </Link>

      <div className="flex flex-col justify-between h-full">
        <div className="text-gray-800 font-semibold mb-2">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </div>

        <div className="text-gray-600 text-sm">
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xl font-bold text-blue-600">
            ${product.price}
          </div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
