import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../component/ProductGrid";
import _debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const showData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const fetchedProducts = response.data.products;
      setAllProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      console.log(allProducts, "BDJG");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const debouncedHandleSearch = _debounce(handleSearch, 300);

  const onSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    debouncedHandleSearch(searchTerm);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}></div>
      <div className="flex items-center justify-center mt-3 mb-3">
        <div className="relative mx-4">
          <input
            type="text"
            placeholder="Search by name ..."
            className="px-2 py-2 pr-16 border border-gray-300 rounded-md overflow-hidden focus:outline-none focus:border-blue-500 w-60 "
            onChange={onSearchInputChange}
          />
          <button className="absolute right-0 top-0 px-2 py-2  text-black rounded-md"> <FontAwesomeIcon icon={faSearch} /> </button>
        </div>
      </div>

      <div className="mt-8">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="flex items-center justify-center h-48">
            <p className="text-2xl text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
