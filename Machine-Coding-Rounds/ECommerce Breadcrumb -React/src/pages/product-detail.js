import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  // come from react-router-dom can access
  // url and can access id which we defined in route
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((resp) => {
        setProduct(resp);
      });
  }, [id]);
  return (
    <div>
      <h1>Product Detail Page</h1>
      {product ? (
        <div style={{ display: "flex" }}>
          <img src={product.thumbnail} alt={product.title} />
          <div style={{margin: 10}}>
            <h3>{product.title}</h3>
            <h3>${product.price}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading ........</p>
      )}
    </div>
  );
};

export default ProductDetail;
