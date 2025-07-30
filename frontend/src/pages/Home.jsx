import React, { useEffect, useState } from "react";
import Hero from "../componenets/Layout/Hero";
import GenderCollectionSection from "../componenets/Products/GenderCollectionSection";
import NewArrivals from "../componenets/Products/NewArrivals";
import ProductsDetails from "../componenets/Products/ProductsDetails";
import ProductGrid from "../componenets/Products/ProductGrid";
import FeaturedCollection from "../componenets/Products/FeaturedCollection";
import FeaturesSection from "../componenets/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);

  useEffect(() => {
    // Fetch product for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    // Fetch BestSeller Products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        // console.log(response.data);
        setBestSellerProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProducts ? (
        <ProductsDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <div className="container mx-auto">
        <FeaturedCollection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Home;
