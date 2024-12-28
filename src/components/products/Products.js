import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import ProductModal from "../productModal/ProductModal";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, hasMore } = useSelector(
    (state) => state.products
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, [dispatch]);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;
    if (bottom && !loading && hasMore && !loadingMore) {
      setLoadingMore(true);
      dispatch(fetchProducts(Math.floor(products.length / 10) + 1)).finally(
        () => setLoadingMore(false)
      );
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, loadingMore]);

  if (loading && products.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product)}
          >
            <h3 className="product-title">{product.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              className="image-layout"
              loading="lazy"
            />
            <p>{product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

      {loadingMore && <div>Loading more...</div>}

      {isModalOpen && selectedProduct && (
        <ProductModal
          isModalOpen={isModalOpen}
          selectedProduct={selectedProduct}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Products;
