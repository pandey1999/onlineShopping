import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ProductPage from "./pages/ProductPage";import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
const PAGE_SIZE = 10;

function App() {
  const [productsData, setProductsData] = useState([]);
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);
  const [currentPage, setCurrentPage] = useState(1);

  const [itemCount, setItemCount] = useState(0);

  const handleUpdateItemCount = (count) => {
    setItemCount(count);
  };

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products?page=${currentPage}");
        setProductsData(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  return (
    <>
    <div className="app-wrapper">

   
    <Header/>
    <div className="content-wrapper">
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="/product/:productId"
          element={<ProductPage products={productsData} addToCart={addToCart} />}
        />
        
        <Route path="/cart" element={<Cart onUpdateItemCount={handleUpdateItemCount}/>}/>
        
        <Route path="*" element={<NoPage />} />
      </Routes>
     
    </div>
    
      <Footer/>
      </div>
    </>
    
    
  )
}

export default App;
