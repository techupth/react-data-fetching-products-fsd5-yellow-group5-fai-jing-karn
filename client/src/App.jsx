import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [productInfo, setProductInfo] = useState([]);

  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductInfo(result.data.data);
    // console.log(result.data.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`).then(getProduct);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productInfo.map((item, index) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                key={item.id}
                onClick={() => deleteProduct(item.id, index)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
