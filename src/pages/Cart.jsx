import React, { useEffect, useState } from "react";

const Cart = ({ onUpdateItemCount }) => {
  const savedCartData = localStorage.getItem("cart");
  const initialCartData = savedCartData ? JSON.parse(savedCartData) : [];
  const [cart, setCart] = useState(initialCartData);

  useEffect(() => {
    const savedCartData = localStorage.getItem("cart");
    setCart(savedCartData ? JSON.parse(savedCartData) : []);
    onUpdateItemCount(cart.length);
  }, [cart, onUpdateItemCount]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex justify-center mt-5 ">
        Shopping Cart
      </h2>

      <div className="flex justify-center flex-col border m-8 p-8 custom-box-shadow">
        {cart?.map((item) => (
          <div key={item.id} className="mb-4">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-gray-800 font-semibold">
                {item.title} - ${item.price}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
