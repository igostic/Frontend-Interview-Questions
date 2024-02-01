import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  // store api response
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((resp) => {
        const slicedProd = resp.products.slice(0, 6);
        console.log(slicedProd);
        setProducts(slicedProd);
      });
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <span>Products</span>
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
              </Link>
            </div>
          );
        })}
      </div>
      <Link to="/products">
        <button style={{ width: "100%", padding: 10 }}>
          View All Products
        </button>
      </Link>
    </div>
  );
};

export default Home;
