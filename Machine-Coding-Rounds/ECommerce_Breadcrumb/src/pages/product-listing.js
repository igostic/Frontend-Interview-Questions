import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductListing = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((resp) => {
        setProducts(resp.products);
      });
  }, []);
  return (
    <div>
      <h1>Product Listing Page</h1>
      <div className="product-grid">
        {products?.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              {/* <Link/> is like <a> tag provided by react-router 
                    -dom, it help us to transition from one page
                    to another in a blink of eye, give a feel of 
                    native app instead of webapp and make app fast
                */}
              <Link to={`/products/${product.id}`}>
                <img src={product.thumbnail} alt="product image" />
                <h3>{product.title}</h3>
                <h3>${product.price}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListing;
