import React, { useEffect, useState } from "react";
import shoppingCart from "../assets/images/shopping-cart.png";

const CartIcon = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const savedCartData = localStorage.getItem("cart");
    const cart = savedCartData ? JSON.parse(savedCartData) : [];
    setItemCount(cart.length);
  }, [itemCount]);

  return (
    <div className="cart-icon">
      <img src={shoppingCart} alt="shopping Image" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
