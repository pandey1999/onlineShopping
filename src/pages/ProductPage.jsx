// ProductPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../component/Loading";

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Check if loading or product is not available yet
  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const NextArrow = ({ onClick }) => (
    <div className="slick-arrow slick-next" onClick={onClick}>
      Next
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      Prev
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex flex-col mt-14 md:flex-row  ml-5 mr-5   ">
      <div className="md:w-1/3 pr-6">
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="h-300 w-full object-cover rounded-lg"
            />
          ))}
        </Slider>
      </div>
      <div className="md:w-2/3">
        {/* ... other product details ... */}
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center mb-4">
          <p className="text-xl font-bold mr-2">${product.price}</p>
          {product.discountPercentage && (
            <p className="text-green-500">{product.discountPercentage}% off</p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <p className="text-xl font-bold mr-2">Rating:</p>
          <p>{product.rating}</p>
        </div>
        <p className="text-xl font-bold mb-4">Brand: {product.brand}</p>
        <p className="text-xl font-bold mb-4">Stock: {product.stock}</p>
      </div>
    </div>
  );
}

export default ProductPage;
